import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import express from "express";
import dotenv from "dotenv"
dotenv.config()
import cookieParser from 'cookie-parser';

import authRoutes from "./src/routes/auth.routess.js"
import userRoutes from "./src/routes/user.routess.js"
import { connectDB } from "./src/lib/db.js";
import chatRoutes from "./src/routes/chat.routess.js"

const app = express();
const PORT = process.env.PORT 

// further signup,login,logout is created 
app.use(express.json()); // so that we can get input form signup/login/logout
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

// THE ROUTE OR PATH IS SAME I.E API/AUTH

app.get("/",(req,res)=>{
    res.send("bhechooo")
})

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB();
});