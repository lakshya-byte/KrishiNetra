import mongoose from "mongoose";

const bidSchema = new mongoose.Schema(
    {
        batchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Batch",
            required: true,
        },

        bidderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // distributor only
            required: true,
        },

        amountPerKg: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: ["Pending", "Accepted", "Rejected", "Cancelled"],
            default: "Pending",
        },
    },
    { timestamps: true }
);

export const Bid = mongoose.model("Bid", bidSchema);
