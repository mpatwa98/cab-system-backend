import Booking from "../models/bookingSchema.js";

// GET all Bookings
const getAllBookings = async (req, res) => {
	try {
		const allBookings = await Booking.find({});
		res.status(200).json(allBookings);
	} catch (error) {
		console.error("Error fetching bookings:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

// Add Bookings
const addBooking = async (req, res) => {
	try {
		const newBooking = new Booking(req.body);
		await newBooking.save();
		res.status(201).send(newBooking);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

export { getAllBookings, addBooking };
