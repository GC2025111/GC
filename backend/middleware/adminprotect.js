import jwt from "jsonwebtoken";

const adminProtect = (req, res, next) => {
    const token = req.cookies.token;
    try{
        if (!token) {
            console.warn("No auth token provided");
            return res.status(401).json({ success: false, msg: "Please log in to access this resource." });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(decoded.email !== process.env.ADMIN_EMAIL){
            return res.status(401).json({ success: false, msg: "Unauthorized,Wrong Credentials!" });
        }
        next();
    }
    catch(err){
        res.status(401).json({ success: false, msg: "Unauthorized, Please log in again." });
    }
}

export default adminProtect;
