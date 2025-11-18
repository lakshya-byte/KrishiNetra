import mongoose from "mongoose";

const documentUploadSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        docType: {
            type: String,
            enum: [
                "AADHAAR",
                "PAN",
                "GST",
                "TRADE_LICENCE",
                "BUSINESS_CERTIFICATE",
                "OTHER",
            ],
            required: true,
        },

        fileUrl: {
            type: String,         // Cloudinary / S3 URL
            required: true,
        },

        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending",
        },

        uploadedAt: {
            type: Date,
            default: Date.now,
        },

        reviewedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // admin reviewer
            default: null,
        },

        reviewedAt: { type: Date },

        rejectionReason: { type: String },
    },
    { timestamps: true }
);

export const DocumentUpload = mongoose.model(
    "DocumentUpload",
    documentUploadSchema
);
