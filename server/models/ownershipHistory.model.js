import mongoose from "mongoose";

const ownershipHistorySchema = new mongoose.Schema(
    {
        batchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Batch",
            required: true,
        },

        previousOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        newOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        transferType: {
            type: String,
            enum: [
                "FarmerToDistributor",
                "DistributorToRetailer",
                "AdminOverride",
            ],
            required: true,
        },

        saleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sale",
            default: null,
        },

        transferDate: {
            type: Date,
            default: Date.now,
        },

        notes: { type: String },
    },
    { timestamps: true }
);

export const OwnershipHistory = mongoose.model(
    "OwnershipHistory",
    ownershipHistorySchema
);
