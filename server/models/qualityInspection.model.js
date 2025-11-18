import mongoose from "mongoose";

const qualityInspectionSchema = new mongoose.Schema(
    {
        batchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Batch",
            required: true,
        },

        inspectorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // could be QC lab user or distributor (role-based)
            required: true,
        },

        inspectorType: {
            type: String,
            enum: ["Internal", "ThirdParty", "Lab"],
            default: "Internal",
        },

        // e.g. [{ name: "moisture", value: "12%", unit: "%" }, ...]
        parameters: [
            {
                name: { type: String, required: true },
                value: { type: mongoose.Schema.Types.Mixed, required: true },
                unit: { type: String },
            },
        ],

        grade: {
            type: String,
            enum: ["A", "B", "C", "D"],
        },

        score: { type: Number, min: 0, max: 100 },

        certificateUrl: { type: String }, // link to QC certificate (S3/Cloudinary)

        passed: { type: Boolean, default: false },

        notes: { type: String },

        verifiedByAdmin: { type: Boolean, default: false },
        verifiedAt: { type: Date },
        verifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

export const QualityInspection = mongoose.model(
    "QualityInspection",
    qualityInspectionSchema
);
