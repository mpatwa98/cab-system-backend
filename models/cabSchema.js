import mongoose from "mongoose";

const cabSchema = new mongoose.Schema(
	{
		cabType: { type: String, required: true },
		description: { type: String },
		image: { type: String },
		seats: { type: Number },
		pricePerMinute: { type: Number, required: true },
	},
	{ collection: "cabs" }
);

const Cab = mongoose.model("cab", cabSchema);
export default Cab;
