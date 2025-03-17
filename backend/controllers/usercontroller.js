import User from '../models/User.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();



const createToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET_KEY);  
};
const decodeToken = (token) => {
    try {
        // Verify the token and decode its payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);        
        return decoded.email; // Extract email from the payload
    } catch (error) {
        console.error("Error decoding token:", error.message);
        return null; // Return null if token is invalid or expired
    }
};

const resisterUser = async (req, res) => {
    const { name, email, password } = req.body;    
    try{
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, msg: "All fields are required" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, msg: "Please enter a strong password" });
        }
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, msg: "User already exists, Please Login!" });
        }

        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);
        user = await User.create({
            name,
            email,
            password: hashedPassword            
        });
        let token=createToken(email);
        let userId=user._id.toString();
        res.cookie("token", token, {
            httpOnly: true,
            secure:process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            success: true,
            msg: "User registered successfully",
            token,        
            userId,
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ success: false, msg: error.message });
    }
}
const loginUser = async(req,res)=>{
    const {email,password}=req.body;
   
    try{
        if(!email || !password){
            return res.status(400).json({ success: false, msg: "All fields are required" });
        }
        let user = await User.findOne({ email });         
        if(!user){
            return res.status(400).json({ success: false, msg: "User not found, Please Register!" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if(!isMatch){
            return res.status(400).json({ success: false, msg: "Invalid password" });
        }
        let token=createToken(email);
        let userId=user._id.toString();
        res.cookie("token", token, {
            httpOnly: true,
            secure:process.env.NODE_ENV === "production",
            maxAge: 24*60*60*1000,  
        });
        res.status(200).json({
            success: true,
            msg: "User logged in successfully",
            token,
            userId,
        });

    }
    catch(error){
        console.error(error);
        res.status(500).json({ success: false, msg: error.message });
    }

}
const adminLogin = async(req,res)=>{
    const {email,password}=req.body;
    console.log(email,password);
    try{
        if(!email || !password){
            return res.status(400).json({ success: false, msg: "All fields are required" });
        }
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){ 
            let token = createToken(email);
            res.cookie("token", token, {
                httpOnly: true,
                secure:process.env.NODE_ENV === "production",
                maxAge: 24*60*60*1000,  
            });
            res.status(200).json({ success: true, msg: "Admin Login successful!", token });
        }
        else{
            res.status(400).json({ success: false, msg: "Invalid Credentials!" });
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({ success: false, msg: error.message });
    }
}

const userID = async (req, res) => {
    const {token} = req.body;    
    console.log(token);
    try{
        const email = decodeToken(token);        
        const user = await User.findOne({ email });     
        console.log(user);
        res.status(200).json({ success: true, userId: user._id.toString() });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ success: false, msg: error.message });
    }
}




export { resisterUser,loginUser,adminLogin,userID };
