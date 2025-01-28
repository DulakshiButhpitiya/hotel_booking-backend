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
