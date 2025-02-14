import express from "express";
import { postgalleryItem, getgalleryItem, deletegalleryItem} from "../controllers/galleryItemController.js"  

const galleryItemRouter = express.Router();


galleryItemRouter.post("/",postgalleryItem);
galleryItemRouter.get("/",getgalleryItem);
galleryItemRouter.delete("/:id",deletegalleryItem);

export default galleryItemRouter