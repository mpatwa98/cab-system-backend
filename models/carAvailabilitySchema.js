import mongoose from "mongoose";

const cabAvailabilitySchema = new mongoose.Schema({
	cabID: { type: mongoose.Schema.Types.ObjectId, ref: "Cab", required: true },
	startTime: { type: Date, required: true },
	endTime: { type: Date, required: true },
});

const CabAvailability = mongoose.model(
	"cabAvailability",
	cabAvailabilitySchema
);
export default CabAvailability;
