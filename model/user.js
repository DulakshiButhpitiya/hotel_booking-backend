import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },

    firstname:{ 
        type: String,
        required: true
    },
     
    lastname:{
        type: String,
        required: true
    },
    img :{
        type: String,
    default:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: "user"
    },
    wPhone: {
        type: String,
        required: true
      
    },
    disabled:{
        type: Boolean,
        default: false,
        required: true
    },
    emailVerified: {
        type: Boolean,
        default: false,
        required: true
    }
});

export const User = mongoose.model("users", userSchema);

export default User;