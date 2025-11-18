import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
    {
        batchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Batch",
            required: true,
        },

        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        buyerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        quantityKg: { type: Number, required: true },

        pricePerKg: { type: Number, required: true },

        totalAmount: { type: Number, required: true },

        saleType: {
            type: String,
            enum: ["FarmerToDistributor", "DistributorToRetailer"],
            required: true,
        },

        paymentStatus: {
            type: String,
            enum: ["Pending", "Completed", "Failed"],
            default: "Pending",
        },

        invoiceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Invoice",
            default: null,
        }
    },
    { timestamps: true }
);

export const Sale = mongoose.model("Sale", saleSchema);
