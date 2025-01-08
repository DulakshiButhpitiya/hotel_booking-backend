import express from "express";
import { postgalleryItem, getgalleryItem} from "../controllers/galleryItemController.js"  

const galleryItemRouter = express.Router();


galleryItemRouter.post("/",postgalleryItem);
galleryItemRouter.get("/",getgalleryItem);

export default galleryItemRouter