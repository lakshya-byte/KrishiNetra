import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        type: {
            type: String,
            enum: [
                "BID",
                "BID_ACCEPTED",
                "SALE",
                "PAYMENT",
                "DISPUTE",
                "DISPUTE_UPDATE",
                "VERIFICATION",
                "INVOICE",
                "LOGISTICS",
                "SYSTEM",
            ],
            required: true,
        },

        title: { type: String, required: true },
        message: { type: String },

        data: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },

        isRead: { type: Boolean, default: false },
        readAt: { type: Date, default: null },
    },
    { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);
