import express from "express";
import { createBooking,createBookingUsingCategory,getAllBookings, retrieveBookingByDate,deleteBooking,updateBookingStatus} from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);
bookingRouter.get("/", getAllBookings);
bookingRouter.post("/filter-date", retrieveBookingByDate );
bookingRouter.post("/create-by-category",createBookingUsingCategory)
bookingRouter.delete("/:bookingId", deleteBooking);
bookingRouter.put("/update-status", updateBookingStatus);


export default bookingRouter        