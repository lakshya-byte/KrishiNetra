import mongoose from "mongoose";

const verificationStatusSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        // KYC documents
        aadhaarVerified: { type: Boolean, default: false },
        panVerified: { type: Boolean, default: false },
        gstVerified: { type: Boolean, default: false },
        tradeLicenceVerified: { type: Boolean, default: false },

        // overall status
        isVerified: { type: Boolean, default: false },

        // admin verification metadata
        verifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // admin
            default: null,
        },
        verifiedAt: { type: Date },

        // reason when rejected
        rejectionReason: { type: String },
    },
    { timestamps: true }
);

export const VerificationStatus = mongoose.model(
    "VerificationStatus",
    verificationStatusSchema
);
