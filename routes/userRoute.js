import express from "express";
import { postUsers,loginUser, getUser} from "../controllers/userController.js"
import { get } from "mongoose";
 


const userRouter = express.Router();



userRouter.post("/", postUsers);
userRouter.post("/login", loginUser);
userRouter.get("/",getUser);




export default userRouter;