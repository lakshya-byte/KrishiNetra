import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        roomId: {
            type: String,
            required: true,
            index: true,       // Faster room message queries
        },

        text: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: ["sent", "read"],
            default: "sent",
        },

        readAt: {
            type: Date,        // Per-message read timestamp
            default: null,
        },
    },
    { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
