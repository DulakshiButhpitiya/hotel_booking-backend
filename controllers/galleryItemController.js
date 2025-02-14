import GalleryItem from "../model/galleryItem.js"
export function postgalleryItem(req, res) {
    const user =req.user
    //token set
    if(user == null){

        res.status(403).json({
            message: "please login to create a galleryItem"
        })
        return
    }
    //check admin role
    if(user.type != "admin"){
        res.status(403).json({
            message: "only admin can create a galleryItem"
            
        })
        return
    }
    //end token
    const galleryItem =req.body.item

    const newgalleryItem =new GalleryItem(galleryItem)

    newgalleryItem.save().then(
        ()=> {
            res.json({
             message: "galleryItem created successfully" })
        }
    ).catch(
        ()=>{
            res.status(500).json({
                message: "galleryItem not created" })
        }
    )
}

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