import express from "express" ;
import { changeBookingStatus, checkAvailabilityOfCar, createBooking, getOwnerBookings, getUserBookings } from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";

const bookingTouter = express.Router();

bookingTouter.post('/chech-availability', checkAvailabilityOfCar)
bookingTouter.post('/create', protect, createBooking)
bookingTouter.get('/user', protect, getUserBookings)
bookingTouter.get('/owner', protect, getOwnerBookings)
bookingTouter.post('/change-status', protect, changeBookingStatus)

export default bookingTouter;