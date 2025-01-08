import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";
import userRouter from "./routes/userRoute.js";
import galleryItemRouter from "./routes/galleryItemRoute.js";
import jwt from "jsonwebtoken";

const app = express();

//middleware
app.use(bodyParser.json())


//databse connection
const connectionString = "mongodb+srv://tester:123@cluster0.st6ek.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


//set jwt token
app.use((req,res,next)=>{

const token =req.header("Authorization")?.replace ("Bearer ","")

if(token !=null){
    jwt.verify(token,"secret",
        (err,decoded)=>{
            if(decoded != null){
                req.user=decoded
                next()

            }else{
                next()
            }
            }
        )
    }
            else{
                next()
            }

    
        })

mongoose.connect(connectionString).then(() => {
    console.log("Connected to database")
}).catch(() => {
    console.log("Failed to connect to database")
})

//routers
app.use("/api/users", userRouter)
app.use("/api/gallery", galleryItemRouter)


//server connection
app.listen(5000, () => {
    console.log("Server started on port 5000")
})