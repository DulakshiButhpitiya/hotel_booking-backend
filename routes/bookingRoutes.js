import express from "express";
import { createBooking,getAllBookings, retrieveBookingByDate} from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);
bookingRouter.get("/", getAllBookings);
bookingRouter.post("/filter-date", retrieveBookingByDate );


export default bookingRouter