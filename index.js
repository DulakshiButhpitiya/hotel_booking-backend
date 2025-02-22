import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";
import userRouter from "./routes/userRoute.js";
import galleryItemRouter from "./routes/galleryItemRoute.js";
import categoryRouter from "./routes/categoryRoutes.js";
import roomRouter from "./routes/roomRoute.js";
import bookingRouter from "./routes/bookingRoutes.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";

//sensitive data save in .env 
dotenv.config();

const app = express();

app.use(cors())

//middleware
app.use(bodyParser.json())


//databse connection
const connectionString = process.env.MONGO_URL;



//set jwt token
app.use((req,res,next)=>{

const token =req.header("Authorization")?.replace ("Bearer ","")
console.log('****+token+******',token);
if(token !=null){
    jwt.verify(token,process.env.JWT_KEY,
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
app.use("/api/category", categoryRouter)
app.use("/api/rooms", roomRouter)
app.use("/api/booking", bookingRouter)


//server connection
app.listen(5000, () => {
    console.log("Server started on port 5000")
})