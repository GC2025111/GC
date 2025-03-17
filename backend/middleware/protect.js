import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const protect = async (req, res, next) => {
    let token;   
    // Check for token in Authorization header
    if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
    ) {
    token = req.headers.authorization.split(" ")[1]; // Extract the token from "Bearer <token>"
    }
    // Check for token in cookies
    else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
    }
   
    // If no token is found, deny access
    if (!token) {
    console.warn("No auth token provided");
    return res
    .status(401)
    .json({ success: false, msg: "Please log in to access this resource." });
    }
   
    try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
   
    // Check if the token contains the required data
    if (!decoded?.email) {
    return res
    .status(400)
    .json({ success: false, msg: "Malformed token. Please log in!" });
    }
   
    // Find the user associated with the token
    const user = await User.findOne({ email: decoded.email }).select(
    "-password"
    );
    if (!user) {
    return res.status(404).json({ success: false, msg: "User not found." });
    }
   
    // Attach user data to the request for downstream usage
    req.user = user;
   
    next(); // Proceed to the next middleware or route handler
    } catch (err) {
    console.error("Error verifying token:", err);
   
    // Handle specific JWT errors
    if (err.name === "TokenExpiredError") {
    return res
    .status(403)
    .json({ success: false, msg: "Session expired. Please log in again." });
    }
   
    if (err.name === "JsonWebTokenError") {
    return res
    .status(403)
    .json({
    success: false,
    msg: "Invalid token or session expired. Please log in again.",
    });
    }
   
    res
    .status(500)
    .json({
    success: false,
    msg: "An error occurred. Please try again later.",
    });
    }
   };
   
   export default protect;