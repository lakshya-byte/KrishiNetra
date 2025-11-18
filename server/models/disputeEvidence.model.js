import mongoose from "mongoose";

const disputeEvidenceSchema = new mongoose.Schema(
    {
        disputeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Dispute",
            required: true,
        },

        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        fileType: {
            type: String,
            enum: ["image", "video", "document"],
            required: true,
        },

        fileUrl: {
            type: String,
            required: true, // S3 / Cloudinary link
        },

        description: {
            type: String,
            maxlength: 300,
        },
    },
    { timestamps: true }
);

export const DisputeEvidence = mongoose.model(
    "DisputeEvidence",
    disputeEvidenceSchema
);
