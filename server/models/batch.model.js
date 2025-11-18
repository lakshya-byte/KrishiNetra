import mongoose from "mongoose";

const batchSchema = new mongoose.Schema(
    {
        farmerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // Basic batch details
        cropType: { type: String, required: true },
        quantityKg: { type: Number, required: true },
        pricePerKg: { type: Number, required: true },

        harvestDate: { type: Date, required: true },
        location: { type: String, required: true },

        // Photos, documents
        images: [{ type: String }],        // Cloudinary/S3 links
        documents: [{ type: String }],     // optional certificates

        // Current Ownership
        currentOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // Status of the batch
        status: {
            type: String,
            enum: [
                "Created",
                "Listed",
                "BidPlaced",
                "SoldToDistributor",
                "ListedForRetailers",
                "SoldToRetailer",
                "Completed",
            ],
            default: "Created",
        },

        // Optional pricing changes (for history)
        priceHistory: [
            {
                pricePerKg: Number,
                updatedAt: Date,
            },
        ],

        // Expiry / Freshness Tracking
        expiryDate: { type: Date },
        freshnessScore: { type: Number, min: 0, max: 100 },

        // Quality Inspection reference
        qualityInspectionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "QualityInspection",
            default: null,
        },
    },
    { timestamps: true }
);

export const Batch = mongoose.model("Batch", batchSchema);
