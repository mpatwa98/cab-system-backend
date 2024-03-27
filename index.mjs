import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import connectDB from "./config/connectDB.js";
import bookingsRouter from "./routes/bookingRoute.js";
import cabsRouter from "./routes/cabRoute.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
	res.send("Hello from Server!!!");
});

app.use("/api/v1/bookings", bookingsRouter);
app.use("/api/v1/cabs", cabsRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
