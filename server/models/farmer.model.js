import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			unique: true,
			required: true,
		},
		farmName: String,
		farmLocation: [
			{
				lat: Number,
				lng: Number,
				address: String,
				landSize: Number,
			},
		],

		crops: [String],
		govtId: String, // optional
		certifications: [String],
		batches: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Batch",
			},
		],
	},
	{ timestamps: true }
);

export const Farmer = mongoose.model("Farmer", farmerSchema);
