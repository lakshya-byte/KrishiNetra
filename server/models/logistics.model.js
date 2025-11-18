// logistics.model.js
import mongoose from "mongoose";

const locationPointSchema = new mongoose.Schema(
    {
        lat: { type: Number },
        lng: { type: Number },
        address: { type: String },
        timestamp: { type: Date, default: Date.now },
    },
    { _id: false }
);

const logisticsSchema = new mongoose.Schema(
    {
        saleId: { type: mongoose.Schema.Types.ObjectId, ref: "Sale", required: false },
        batchId: { type: mongoose.Schema.Types.ObjectId, ref: "Batch", required: true },

        // Who's carrying the shipment (could be distributor user or third-party carrier)
        carrierId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
        carrierName: { type: String },

        trackingNumber: { type: String },

        status: {
            type: String,
            enum: ["Pending", "Packed", "Dispatched", "In-Transit", "Out-for-Delivery", "Delivered", "Returned", "Cancelled"],
            default: "Pending",
        },

        // Geolocation timeline
        route: [locationPointSchema],

        // Optional quick view fields
        currentLocation: { type: String },
        estimatedDeliveryAt: { type: Date },
        dispatchedAt: { type: Date },
        deliveredAt: { type: Date },

        // Proofs / delivery notes
        proofOfDeliveryUrl: { type: String }, // photo / signature link
        notes: { type: String },

        // Status history for audit
        statusHistory: [
            {
                status: { type: String },
                changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                at: { type: Date, default: Date.now },
                note: { type: String },
            },
        ],
    },
    { timestamps: true }
);

export const Logistics = mongoose.model("Logistics", logisticsSchema);
