import express from "express";
import { postgalleryItem, getgalleryItem, deletegalleryItem } from "../controllers/galleryItemController.js";  
import upload from "../utils/multer.js"; // Ensure correct path

const galleryItemRouter = express.Router();

// Define routes
galleryItemRouter.post("/", upload.single("img"), postgalleryItem);
galleryItemRouter.get("/", getgalleryItem);
galleryItemRouter.delete("/:id", deletegalleryItem);

export default galleryItemRouter;
