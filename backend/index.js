const express =require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const connectDB=require("./config/db")
const authRoutes=require("./routes/authRoutes");
dotenv.config();

connectDB();


const app=express();

app.use(express.json());

app.use("/api/auth",authRoutes);

app.get("/", (req, res) => {
    res.send("Hi i am live");
});
const PORT=process.env.PORT || 5000

app.get("/",(req,res)=>{
    res.send("Hi i am live")
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})