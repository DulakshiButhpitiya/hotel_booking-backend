import Booking from "../model/booking.js";
import { isCustomerValid } from "./userController.js";
import Room from "../model/room.js";

export function createBooking(req, res) {

    // if(!isCustomerValid (req)){
    //     res.status(403).json({
    //         message: "Invalid Customer(forbidden)",
    //     })
    //     return
    // }

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

// export async function createBooking(req, res) {
//     if (isCustomerValid(req)) {
//         return res.status(403).json({ message: "Invalid Customer (forbidden)" });
//     }

//     try {
//         let newId;
//         let isUnique = false;

//         // Generate a unique `bookingId`
//         while (!isUnique) {
//             newId = 1200 + Math.floor(Math.random() * 100000);
//             const existingBooking = await Booking.findOne({ bookingId: newId });
//             if (!existingBooking) isUnique = true;
//         }

//         const newBooking = new Booking({
//             bookingId: newId,
//             roomId: req.body.roomId,
//             email: req.user.email,
//             start: req.body.start,
//             end: req.body.end,
//         });

//         const result = await newBooking.save();
//         res.json({ message: "Booking created", result });
//     } catch (error) {
//         res.status(500).json({ message: "Booking not created", error });
//     }
// }


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
    
export async function createBookingUsingCategory(req, res) {
  //check if user logged in
//   if(!isCustomerValid(req)){
//     res.status(403).json({
//       message: "Forbidden"
//     })
//     return;
//   }
	try {
		const { category, start, end } = req.body;

		// Validate input
		if (!category || !start || !end) {
			return res.status(400).json({
				message: "Invalid input. Category, start, and end dates are required.",
			});
		}

		const startDate = new Date(start);
		const endDate = new Date(end);

		if (startDate >= endDate) {
			return res.status(400).json({
				message:
					"Invalid date range. Start date must be earlier than end date.",
			});
		}

		// Find bookings that overlap with the given dates
		const overlappingBookings = await Booking.find({
			$or: [
				{ start: { $lt: endDate }, end: { $gt: startDate } }, // Full or partial overlap
			],
		});

		const occupiedRooms = overlappingBookings.map((booking) => booking.roomId);

		// Find available rooms in the given category
		const availableRooms = await Room.find({
			roomId: { $nin: occupiedRooms },
			category: category,
		});

		if (availableRooms.length === 0) {
			return res.status(404).json({
				message:
					"No available rooms in the selected category for the given dates.",
			});
		}

		// Generate booking ID
		const startingId = 1200;
		const bookingCount = await Booking.countDocuments();
		const newBookingId = startingId + bookingCount + 1;

		// Create new booking
		const newBooking = new Booking({
			bookingId: newBookingId,
			roomId: availableRooms[0].roomId, // Select the first available room
			email: req.user.email,
			status: "pending", // Default status
			start: startDate,
			end: endDate,
		});

		const savedBooking = await newBooking.save();

		return res.status(201).json({
			message: "Booking created successfully",
			booking: savedBooking,
		});
	} catch (error) {
		console.error("Error creating booking:", error);
		return res.status(500).json({
			message: "Booking creation failed",
			error: error.message,
		});
	}
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
