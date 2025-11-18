import mongoose from "mongoose";

const retailerProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        // Retailer-specific fields
        gstNumber: { type: String, required: true },
        tradeLicence: { type: String, required: true },
        panNumber: { type: String, required: true },

        // Optional business info
        storeName: { type: String },
        storeAddress: { type: String },

        // Verification Status
        isVerified: { type: Boolean, default: false },
        verifiedAt: { type: Date },
    },
    { timestamps: true }
);

export const RetailerProfile = mongoose.model(
    "RetailerProfile",
    retailerProfileSchema
);
