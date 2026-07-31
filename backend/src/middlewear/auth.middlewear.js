import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token) return res.status(401).json({message: "Unauthorized - No token provided"});
        
        const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY);
        if(!decoded) return res.status(401).json({message: "Unauthorized - Invalid token"});

        const user = await User.findById(decoded.userId).select("-password");  // deselect the password in changes json message
        if(!user) return res.status(401).json({message: "Unauthorized - No User found"});

        req.user = user;
        next(); // next in function ie onboard and other if yoused in any fn
    } catch (error) {
        console.log("Error in protectRoute middlewear: ", error);
    }
}