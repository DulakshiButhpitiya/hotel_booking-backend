import Category from "../model/category.js";

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


