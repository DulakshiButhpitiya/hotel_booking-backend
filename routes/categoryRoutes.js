import express from "express";
import { createCategory,deleteCategory, getCategories} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.get("/searchByPrice",(req,res)=>
    res.json({
        message : "search by price"
    })
)
categoryRouter.post("/",createCategory);
categoryRouter.delete("/:name",deleteCategory);
categoryRouter.get("/",getCategories);


export default categoryRouter