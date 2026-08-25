import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);


import express from "express";
import dotenv from "dotenv"
dotenv.config()
import cookieParser from 'cookie-parser';
import cors from "cors";
import authRoutes from "./src/routes/auth.routess.js"
import userRoutes from "./src/routes/user.routess.js"
import { connectDB } from "./src/lib/db.js";
import chatRoutes from "./src/routes/chat.routess.js"

import path from "path";
//path
const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT 

// further signup,login,logout is created 
app.use(express.json()); // so that we can get input form signup/login/logout
app.use(cookieParser());

// solid reason to place it here before the routes is that we want to allow the frontend to send cookies to backend and also we want to allow the frontend to send requests to backend from different origin. So we need to use cors middleware before the routes.
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,  // allow frontend to send cookies to backend
}))
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// AFTER the roots - if you are in production 
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*" , (req,res)=>{
        res.sendFile(path.join(__dirname, "/frontend" , "dist" , "index.html"))
    })
}

// THE ROUTE OR PATH IS SAME I.E API/AUTH

app.get("/",(req,res)=>{
    res.send("bhechooo")
})

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB();
});