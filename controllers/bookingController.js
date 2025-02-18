import Booking from "../model/booking.js";
import { isCustomerValid } from "./userController.js";

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

export  function getAllBookings(res,req) {
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
    

    
    
