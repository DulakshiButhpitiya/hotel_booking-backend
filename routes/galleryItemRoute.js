import express from "express";
import { postgalleryItem, getgalleryItem, deletegalleryItem} from "../controllers/galleryItemController.js"  
import upload from "../utils/multer.js";
const galleryItemRouter = express.Router();


galleryItemRouter.post("/",upload.single("img"),postgalleryItem);
galleryItemRouter.get("/",getgalleryItem);
galleryItemRouter.delete("/:id",deletegalleryItem);

export default galleryItemRouter