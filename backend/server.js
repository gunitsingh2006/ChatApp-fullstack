import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import express from "express";
import dotenv from "dotenv"
dotenv.config()

import authRoutes from "./src/routes/auth.js"
import { connectDB } from "./src/lib/db.js";


const app = express();
const PORT = process.env.PORT 

app.use(express.json()); // so that we can get input form signup/login/logout
app.use("/api/auth", authRoutes);

// THE ROUTE OR PATH IS SAME I.E API/AUTH

app.get("/",(req,res)=>{
    app.send("bhechooo")
})

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB();
});