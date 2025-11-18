import mongoose from "mongoose";

const distributorProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        // Distributor-specific required fields
        gstNumber: { type: String, required: true },
        tradeLicence: { type: String, required: true },
        panNumber: { type: String, required: true },

        // Optional business info
        businessName: { type: String },
        warehouseAddress: { type: String },

        // Verification Status
        isVerified: { type: Boolean, default: false },
        verifiedAt: { type: Date },
    },
    { timestamps: true }
);

export const DistributorProfile = mongoose.model(
    "DistributorProfile",
    distributorProfileSchema
);
