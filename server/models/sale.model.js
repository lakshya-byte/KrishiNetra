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

        items: [
            {
                batchId: { type: mongoose.Schema.Types.ObjectId, ref: "Batch" },
                description: { type: String },
                quantityKg: { type: Number },
                pricePerKg: { type: Number },
                lineTotal: { type: Number },
            },
        ],

        saleType: {
            type: String,
            enum: ["FarmerToDistributor", "DistributorToRetailer"],
            required: true,
        },

        taxDetails: {
            gstPercent: { type: Number ,default:10 },
            gstAmount: { type: Number},
        },

        paymentStatus: {
            type: String,
            enum: ["Pending", "Completed", "Failed"],
            default: "Pending",
        },

        paymentMethod: {
            type: String,
            enum: ["UPI", "BankTransfer", "Cash", "Card", "Wallet", "None"],
            default: "None",
        },

        initiatedAt: { type: Date, default: Date.now },
        completedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export const Sale = mongoose.model("Sale", saleSchema);