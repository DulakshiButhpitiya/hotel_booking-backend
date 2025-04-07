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
            message: "only admin can create a category(ferbidden)"
        })
            return
        }

            // Check if image file is uploaded
    if (!req.file) {
        return res.status(400).json({
            message: "Image not uploaded",
        });
    }

    const { name, description,
        price,
        features} = req.body;

        const newCategory = new Category({
            name,
            description,
            price,
            features,
            img: req.file.filename, // Save filename
        });

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

    // export async function deleteCategory(req, res) {
    //     // Log the user object for debugging
    //     console.log("User attempting to delete category:", req.user);
    
    //     // Check if the user is authenticated
    //     if (!req.user) {
    //         return res.status(403).json({
    //             message: "Please login to delete a category (unauthorized).",
    //         });
    //     }
    
    //     // Check if the user is an admin
    //     if (req.user.type !== "admin") {
    //         return res.status(403).json({
    //             message: "Only admin can delete a category (forbidden).",
    //         });
    //     }
    
    //     // Extract the category name from the request parameters
    //     const { name } = req.params;
    
    //     // Log the category name for debugging
    //     console.log("Attempting to delete category:", name);
    
    //     try {
    //         // Attempt to delete the category
    //         const deletedCategory = await Category.findOneAndDelete({ name });
    
    //         // Check if the category was found and deleted
    //         if (!deletedCategory) {
    //             return res.status(404).json({
    //                 message: "Category not found.",
    //             });
    //         }
    
    //         // Send success response
    //         return res.json({
    //             message: "Category deleted successfully.",
    //         });
    //     } catch (error) {
    //         // Log the error for debugging
    //         console.error("Error deleting category:", error);
    
    //         // Send error response
    //         return res.status(500).json({
    //             message: "Category not deleted due to an error.",
    //             error: error.message,
    //         });
    //     }
    // }

    export function deleteCategory(req, res) {
        console.log(req.user);
        if (!req.user) {
            res.status(403).json({
                message: "Please login to delete a category (unauthorized).",
            });
            
        }
        if (req.user.type != "admin") {
            res.status(403).json({
                message: "Only admin can delete a category (forbidden).",
            });
            
        }
    
        const name = req.params.name;
    
        // console.log("Attempting to delete category:", name);
    
        Category.findOneAndDelete({name:name})
            .then(() => {
                res.json({
                    message: "Category deleted successfully.",
             
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
            
