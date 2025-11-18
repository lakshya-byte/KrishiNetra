import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
    {
        invoiceNumber: { type: String, required: true, unique: true },

        saleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sale",
            required: false,
        },

        buyerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // Line items (one or more batches)
        items: [
            {
                batchId: { type: mongoose.Schema.Types.ObjectId, ref: "Batch" },
                description: { type: String },
                quantityKg: { type: Number },
                pricePerKg: { type: Number },
                lineTotal: { type: Number },
            },
        ],

        subTotal: { type: Number, required: true },
        taxAmount: { type: Number, default: 0 },
        totalAmount: { type: Number, required: true },

        taxDetails: {
            gstPercent: { type: Number },
            gstAmount: { type: Number },
        },

        invoicePdfUrl: { type: String }, // S3/Cloudinary link to PDF

        status: {
            type: String,
            enum: ["Draft", "Issued", "Paid", "Cancelled"],
            default: "Issued",
        },

        issuedAt: { type: Date, default: Date.now },
        dueDate: { type: Date },

        paymentStatus: {
            type: String,
            enum: ["Pending", "Completed", "Failed", "Refunded"],
            default: "Pending",
        },

        paymentMethod: {
            type: String,
            enum: ["UPI", "BankTransfer", "Cash", "Card", "Wallet", "None"],
            default: "None",
        },

        notes: { type: String },
    },
    { timestamps: true }
);

export const Invoice = mongoose.model("Invoice", invoiceSchema);
