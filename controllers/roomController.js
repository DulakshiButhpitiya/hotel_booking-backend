import Room from "../model/room.js";
import { isAdminValid } from "./userController.js";

export function createRoom(req, res) {
    if(!isAdminValid(req)){
        res.status(403).json({
            message: "forbidden access",
        });
        return;
    }

    const newRoom = new Room(req.body)
    newRoom.save().then(
        (result) => {
            res.json({
                message: "room created successfully",
                result: result,
            });
        }

    ).catch(
        (error) => {
            res.json({
                message: "room not created",
                error: error,
            });
        }
    )
    }

    //delete room
    export function deleteRoom(req,res) {
        if(!isAdminValid(req)){
            res.status(403).json({
                message: "forbidden access",
            });
            return;
        }
        const roomId = req.params.roomId;
        Room.findOneAndDelete({roomId : roomId}).then(
            (result) => {
                res.json({
                    message: "room deleted successfully",
                    result: result,
                });
            }
        ).catch(
            (error) => {
                res.json({
                    message: "room not deleted",
                    error: error,
                });
            }
        )
    }

    //get room
    export function findRoomById(req, res) {
        const roomId =req.params.roomId

        Room.findOne({roomId : roomId}).then(
            (result)=>{
                if(result==null){
                    res.ststus(404).json({
                        message: "room not found"
                    })
                    return;
                }else {
                    res.json({
                        message :"Room found",
                        result :result

                    })
                }
            })
            .catch(
                (err)=>{
                    res.json({
                        message : "room not found",
                        error : err
                    })
                }
            )
                }

                //get all
        export function getRooms(req, res) {
            Room.find().then(
                (result) => {
                    res.json({
                        message: "rooms found",
                        result: result,
                    });
                }
            ).catch(
                (error) => {
                    res.json({
                        message: "rooms not found",
                        error: error,
                    });
                }
            )
        }

        export function updateRoom(req, res) {
            if(!isAdminValid(req)){
                res.status(403).json({
                    message: "forbidden access",
                });
                return;
            }
            const roomId = req.params.roomId;

            Room.findOneAndUpdate({ 
                roomId: roomId }, req.body).then(
                    ()=>{
                        res.json({
                            message: "room updated successfully"
                        })
                    }
                ).catch(
                    (error)=>{
                        res.json({
                            message: "room not updated",
                            error: error
                        })
                    }
                )
            }
            
            export function getRoomsByCategory(req, res) { //get rooms by category
            const category = req.params.category;

            Room.find({ category: category }).then(
                (result) => {
                    res.json({
                        
                        result: result,
                    });
                }
              ).catch(
                (error) => {
                    res.json({
                        message: "rooms not found",
                        error: error,
                    });
                }
            )

        }
