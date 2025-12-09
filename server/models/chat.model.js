import mongoose from "mongoose";

 const chatRoomSchema = new mongoose.Schema(
    {
        roomId: {
            type: String,
            unique: true,
            required: true, // e.g. private:<id1>:<id2>, batch:<batchId>, dispute:<id>
        },

        type: {
            type: String,
            enum: ["private", "batch", "dispute"],
            required: true,
        },

        // For batch rooms → batchId
        // For dispute rooms → disputeId
        // For private rooms → null
        refId: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },

        // Who created the room
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // Allowed members of the room
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

export const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);
