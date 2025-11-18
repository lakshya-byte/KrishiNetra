import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema(
	{
		user: {
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
		govtId: String,
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

export default mongoose.model("Farmer", farmerSchema);
