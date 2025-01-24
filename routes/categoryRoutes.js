import express from "express";
import { createCategory,deleteCategory, getCategoryByName, getCategory,updateCategory} from "../controllers/categoryController.js";

const categoryRouter = express.Router();


categoryRouter.post("/",createCategory);
categoryRouter.delete("/:name",deleteCategory);
categoryRouter.get("/searchByPrice",(req,res)=>
    res.json({
        message : "search by price"
    })
)

categoryRouter.get("/:name",getCategoryByName);
categoryRouter.get("/",getCategory);
categoryRouter.put("/:name",updateCategory);


export default categoryRouter