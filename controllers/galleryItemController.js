

import GalleryItem from "../model/galleryItem.js"; // Ensure model is imported

export function postgalleryItem(req, res) {
    const user = req.user;

    // Token check
    if (!user) {
        return res.status(403).json({
            message: "Please login to create a gallery item",
        });
    }

    // Admin role check
    if (user.type !== "admin") {
        return res.status(403).json({
            message: "Only admins can create a gallery item",
        });
    }

    // Check if image file is uploaded
    if (!req.file) {
        return res.status(400).json({
            message: "Image not uploaded",
        });
    }

    const { name, description } = req.body;

    // Create a new gallery item properly using Mongoose model
    const newGalleryItem = new GalleryItem({
        name,
        description,
        img: req.file.filename, // Save filename
    });

    // Save the new gallery item to the database
    newGalleryItem
        .save()
        .then((result) => {
            res.json({
                message: "Gallery item created successfully",
                result: result,
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                message: "Gallery item not created",
                error: error.message,
            });
        });
}



//    const galleryItem =req.body

//     const newgalleryItem =new GalleryItem(galleryItem)

//     newgalleryItem.save().then(
//         ()=> {
//             res.json({
//              message: "galleryItem created successfully" })
//         }
//     ).catch(
//         ()=>{
//             res.status(500).json({
//                 message: "galleryItem not created" })
//         }
//     )


export function getgalleryItem(req, res) {
    GalleryItem.find().then(
        (List)=>{
            res.json({
                list :List
            })
        }
    )
}

// gallery item delete
export function deletegalleryItem(req, res) {
    const user =req.user
    //token set
    if(user == null){

        res.status(403).json({
            message: "please login to delete a galleryItem"
        })
        return
    }
    //check admin role
    if(user.type != "admin"){
        res.status(403).json({
            message: "only admin can delete a galleryItem"
            
        })
        return
    }
    //end token
    const id =req.params.id
    GalleryItem.findByIdAndDelete(id).then(
        ()=>{
            res.json({
                message: "galleryItem deleted successfully"
            })
        }
    ).catch(
        ()=>{
            res.status(500).json({
                message: "galleryItem not deleted"
            })
        }
    )
}