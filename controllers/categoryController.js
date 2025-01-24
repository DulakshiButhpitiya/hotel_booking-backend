import Category from "../model/category.js";
import { isAdminValid } from "./userController.js";

export function createCategory(req, res) {
    if(req.user ==null){
        res.status(403).json({
            message: "please login to create a category(unautherised)"
        })
        return
    }
    if (req.user.type != "admin") {
        res.status(403).json({
            message: "only admin can create a category(feridden)"})
            return
        }
        const newCategory = new Category(req.body);
        newCategory.save().then(
            (result)=>{

                res.json({
                    message: "category created successfully",
                    result : result
                })
            }
        ).catch((error)=>{
            res.json({
                message: "category not created",
                error : error
            })
        })
    }   



    export function deleteCategory(req, res) {
        if (req.user == null) {
            res.status(403).json({
                message: "Please login to delete a category (unauthorized).",
            });
            return;
        }
        if (req.user.type !== "admin") {
            res.status(403).json({
                message: "Only admin can delete a category (forbidden).",
            });
            return;
        }
    
        const name = req.params.name;
    
        console.log("Attempting to delete category:", name);
    
        Category.findOneAndDelete({ name: name })
            .then((result) => {
                if (!result) {
                    res.status(404).json({
                        message: "Category not found.",
                    });
                    return;
                }
    
                res.json({
                    message: "Category deleted successfully.",
                    result: result,
                });
            })
            .catch((error) => {
                console.error("Error deleting category:", error);
                res.status(500).json({
                    message: "Category not deleted due to an error.",
                    error: error.message,
                });
            });
    }
    
    export function getCategory(req, res) {    
        Category.find().then(
            (result) => {
                res.json({
                    categories : result
                })
            }
        ).catch(
            (error)=>{
                res.json(
                    {
                        message : "failed to get categories",
                        error : error
                    }
        )
                });
            }
             
            
            export function getCategoryByName(req, res) {
                const name = req.params.name;
                Category.findOne({ name: name })
                    .then(
                        (result) => {

                        if (result==null) {
                            res.json({
                                message: "Category not found.",
                            });
                            
                        }
                        else{
                            res.json({
                                category : result
                            })
                        }
    
                        })
                    .catch(
                        () => {
                            res.json({
                                message: "failed to get category.",
                            });
                        }
                    )}

            export function updateCategory(req, res) {
                if(!isAdminValid(req)){
                    res.status(403).json({
                        message: "Please login to update a category (unauthorized).",
                    });
                    return;
                }
                const name = req.params.name;
               Category.updateOne({name : name},req.body).then(
                ()=>{
                    res.json({
                        message: "category updated successfully"
                    })
                }
               ).catch(
                (error)=>{
                    res.json({
                        message: "failed to update category",
                        error : error
                    })
                }
                   
               )
            }
            
