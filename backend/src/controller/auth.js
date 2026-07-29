import User from "../models/User.js"
import jwt from "jsonwebtoken"

export async function signup(req,res){
    // res.send("Signup Route")
    const {email,password,fullName} = req.body;
    try {
        if(!password  || !email|| !fullName) {
            return res.status(400).json({message: "All fields are Required"})
        }
        if(password.length < 6) {
            return res.status(400).json({message: "password length must be atleast 6 charactyer long"})
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // from ai to check the email validation
        if(!emailRegex.test(email)){
            return res.status(400).json({message: "Inavlid email format"})
        }

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: "Eamil alrdy exist, plese enter different one"})
        }
        const idx = Math.floor(Math.random()* 512)+1; // generate a number between 1-512
        const randomAvatar = `https://testingbot.com/free-online-tools/random-avatar/${idx}.png`;
        const newUser = await User.create({
            email,password,fullName,
            pfp:randomAvatar,
        })
        // TODO: CREATE THE USER IN STREAM AS WELL
        // CREATING JWT TOKEN 
        const token = jwt.sign({userId:newUser._id}, process.env.JWT_SECRET_KEY,{
            expiresIn:"7d" // the expiry of the token generated in browser form signIn
        })
        //IMPORTANT AFTER TOKEN
        res.cookie("jwt",token,{
            maxAge: 7*24*60*60*1000,
            httpOnly: true, // prevent from xss attacks ->. XSS (Cross-Site Scripting) is an attack where someone injects malicious JavaScript into a website, which then runs in other users' browsers — often without them knowing.
            sameSite:"strict", // prevent csrf attacks ->. CSRF (Cross-Site Request Forgery) is an attack where a malicious site tricks your browser into making a request to a site you're already logged into — using your existing session/cookies — without you meaning to.
            secure: process.env.NODE_ENV === "production", // only over HTTPS
        })
        // somthing is created  
        res.status(201).json({success:true, user:newUser})
    } catch (error) {
        console.log("ERROR in signup controller", error);
        res.status(500).json({message: "INTERNAL SERVER ERROR"});
    }
}


export async function login(req,res){
    // res.send("login Route")
    try {
        //field checker
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"All filed are required"});
        }
        //user checker
        const user = await User.findOne({email})
        if(!user) return res.status(401).json({message:"Invaild email or password"})
        
        //password checker
        const isPasswordCorrect = await user.matchPassword(password)
        if(!isPasswordCorrect) return res.status(401).json({message:"Invaild email or password"})

        // CREATING JWT TOKEN SAME AS SIGNUP
        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET_KEY,{
            expiresIn:"7d" 
        })
        //IMPORTANT AFTER TOKEN
        res.cookie("jwt",token,{
            maxAge: 7*24*60*60*1000,
            httpOnly: true, 
            sameSite:"strict", 
            secure: process.env.NODE_ENV === "production",
        })
        // somthing is created  
        res.status(200).json({success:true,user})
    } catch (error) {
        console.log("ERROR in login controller", error);
        res.status(500).json({message: "INTERNAL SERVER ERROR"});
    }
}


export async function logout(req,res){
    res.clearCookie("jwt")
    res.status(200).json({ success:true, message: " Logout hogyyaaa bhai"})
    
}