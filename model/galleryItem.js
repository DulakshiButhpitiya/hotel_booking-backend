import mongoose from "mongoose";
const galleryItemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    img :{
        type: String,
        required: true
    },
    description :{
        type: String, 
        required: true        
    }    
    })
    
    const galleryItem= mongoose.model("galleryItem", galleryItemSchema);

    export default galleryItem