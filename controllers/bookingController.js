import Booking from "../model/booking.js";
import { isCustomerValid } from "./userController.js";
import room from "../model/room.js";

export function createBooking(req, res) {

    if(!isCustomerValid (req)){
        res.status(403).json({
            message: "Invalid Customer(forbidden)",
        })
        return
    }

    const startingId = 1200;

    Booking.countDocuments({}).then(
        (count) => {
        console.log(count);
        const newId = startingId + count + 1;
        const newBooking =new Booking({
            bookingId: newId,
            roomId: req.body.roomId,
            email: req.user.email,
            start: req.body.start,
            end: req.body.end,
        });

        newBooking.save().then(
            (result) => {
                res.json({
                    message: "Booking created",
                    result: result,
                });
            }
        ).catch(
            (error) => {
                res.json({
                    message: "Booking not created",
                    error: error,
                });
            }
        );

        }
    ).catch(
    (error) => {
        res.json({
            message: "Booking creation failed",
            error: error,
        });
    }
    );
}

export  function getAllBookings(req, res) {
    Booking.find().then(
        (result) => {
            res.json({
                message: "All bookings",
                result: result,
            });
        }
    ).catch(
        (error) => {
            res.json({
                message: "No bookings found",
                error: error,
            });
        }   
    );
}

export function retrieveBookingByDate(req, res) {
    const start = req.body.start;
    const end = req.body.end;

    console.log(start);
    console.log(end);

    Booking.find({ start: { 
        // greater-than  $gte=greater than or equal to   $lt=less than
        $gt: start, 

        $lt: new Date(end) } 
    })
        .then(
        (result) => {
        res.json({
            message: "Filtered bookings",
            result: result,  })
         } ).catch(
            (error) => {
                res.json({
                    message: "failed to get filtered bookings",
                    error: error,
                });
            }
        );
        }
    
export function createBookingUsingCategory(req, res) {  

    const start =new Date(req.body.start);
    const end = new Date(req.body.end);

    Booking.find({
        $or: [
            { start: {
                 $gte: start,
                 $lt: end } },

            { end: {
                 $gte: start, 
                 $lt: end 
                } }
        ],}).then((response) => {
           
                const overlappingBookings = response;

                const rooms=[];

                for (let i = 0; i < overlappingBookings.length; i++) {
                    rooms.push(overlappingBookings[i].roomId);
                    
                }

                room.find({
                    roomId: {
                        $nin: rooms,
                    },
                    category : req.body.category
                }).then((rooms) => {
                    if(rooms.length == 0) {
                    res.json({
                        message: "No rooms available",
                    });
                }else {
                    Booking.countDocuments({}).then(
                        (count) => {
                        console.log(count);
                        const newId = startingId + count + 1;
                        const newBooking =new Booking({
                            bookingId: newId,
                            roomId: rooms[0].roomId,
                            email: req.user.email,
                            start: start,
                            end: end,
                        });
                
                        newBooking.save().then(
                            (result) => {
                                res.json({
                                    message: "Booking created",
                                    result: result,
                                });
                            }
                        ).catch(
                            (error) => {
                                res.json({
                                    message: "Booking not created",
                                    error: error,
                                });
                            }
                        );
                
                        }
                    ).catch(
                    (error) => {
                        res.json({
                            message: "Booking creation failed",
                            error: error,
                        });
                    }
                    );
                }
            }
        )
    }

    )
}

export function deleteBooking(req, res) {
    const { bookingId } = req.params;
  
    Booking.findOneAndDelete({ bookingId })
      .then((deletedBooking) => {
        if (!deletedBooking) {
          return res.status(404).json({ message: "Booking not found" });
        }
        res.json({ message: "Booking deleted successfully" });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error deleting booking", error });
      });
  }  

  export function updateBookingStatus(req, res) {
    const { bookingId, status, reason } = req.body;

    // Validate the status value
    const allowedStatuses = ["pending", "approved", "rejected", "completed", "cancelled"];
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }

    // Find booking and update status
    Booking.findOneAndUpdate(
        { bookingId: bookingId },
        { status: status, reason: reason || "" },
        { new: true } // Return updated document
    )
    .then(updatedBooking => {
        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.json({ message: "Booking status updated", result: updatedBooking });
    })
    .catch(error => res.status(500).json({ message: "Error updating status", error }));
}
