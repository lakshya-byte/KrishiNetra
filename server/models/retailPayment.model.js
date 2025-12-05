import mongoose from "mongoose";

const retailPaymentSchema = new mongoose.Schema({
    retailerId: { type: mongoose.Schema.Types.ObjectId, ref: "Retailer", required: true },
    batchId: { type: mongoose.Schema.Types.ObjectId, ref: "Batch", required: true },
    quantity: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    status: { type: String, enum: ["PENDING", "PAID", "FAILED"], default: "PENDING" },
}, { timestamps: true });

export const RetailPayment = mongoose.model("RetailPayment", retailPaymentSchema);
