import express from "express";
import { postUsers,loginUser, getUser, getAllUsers,delelteUserByEmail,disableUser} from "../controllers/userController.js"
import { get } from "mongoose";
 


const userRouter = express.Router();



userRouter.post("/", postUsers);
userRouter.post("/login", loginUser);
userRouter.get("/",getUser);
userRouter.get("/all",getAllUsers)
userRouter.put("/disable/:userId",disableUser)

userRouter.delete("/admin-delete/:email",delelteUserByEmail)



export default userRouter;