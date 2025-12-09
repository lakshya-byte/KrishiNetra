import mongoose from "mongoose";
import { ChatRoom } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

/**
 * 1. GET ALL USERS
 * Used to populate the "People" sidebar.
 * Excludes the currently logged-in user.
 */
export const getAllUsers = async (req, res) => {
    try {
        const currentUserId = req.user._id;

        // Find all users except the current one
        const users = await User.find({ _id: { $ne: currentUserId } })
            .select("name email avatar role") // Select only necessary fields
            .sort({ name: 1 }); // Sort alphabetically

        return res.status(200).json({ ok: true, data: users });
    } catch (error) {
        console.error("getAllUsers error:", error);
        return res.status(500).json({ ok: false, error: "Server error" });
    }
};

/**
 * 2. CREATE OR GET PRIVATE ROOM
 * Called when you click on a user in the sidebar.
 * It atomically finds the existing room OR creates a new one.
 */
export const createPrivateRoom = async (req, res) => {
    try {
        const userId = req.user._id;
        const { otherUserId } = req.body;

        // Validation
        if (!otherUserId || !mongoose.Types.ObjectId.isValid(otherUserId)) {
            return res.status(400).json({ ok: false, error: "Valid otherUserId required" });
        }

        if (userId.toString() === otherUserId.toString()) {
            return res.status(400).json({ ok: false, error: "Cannot chat with yourself" });
        }

        // Canonical Room ID: "private:smallerID:largerID"
        // This ensures that User A clicking User B generates the SAME ID as User B clicking User A
        const u1 = userId.toString();
        const u2 = otherUserId.toString();
        const roomId = `private:${[u1, u2].sort().join(":")}`;

        // Atomic Operation: Find existing room, OR Create if it doesn't exist (upsert)
        // This prevents race conditions (duplicate rooms)
        const room = await ChatRoom.findOneAndUpdate(
            { roomId },
            {
                $setOnInsert: {
                    roomId,
                    type: "private",
                    refId: null,
                    createdBy: userId,
                    members: [userId, otherUserId]
                }
            },
            { new: true, upsert: true } // Return the doc (new or existing)
        );

        return res.status(200).json({ ok: true, room });

    } catch (error) {
        console.error("createPrivateRoom error:", error);
        return res.status(500).json({ ok: false, error: "Server error" });
    }
};

/**
 * 3. GET MESSAGES
 * Loads chat history when a room is opened.
 */
export const getRoomMessages = async (req, res) => {
    try {
        const { roomId } = req.params;

        // Fetch messages for this room
        const messages = await Message.find({ roomId })
            .populate("from", "name avatar") // Get sender details
            .sort({ createdAt: 1 }); // Sort oldest to newest (Chronological)

        return res.status(200).json({ ok: true, data: messages });
    } catch (error) {
        console.error("getRoomMessages error:", error);
        return res.status(500).json({ ok: false, error: "Server error" });
    }
};

/**
 * OPTIONAL: JOIN ROOM HANDLER
 * (Mostly redundant for private chats since createPrivateRoom does the job,
 * but useful if you have public group chats later)
 */
export const joinRoomHandler = async (req, res) => {
    try {
        const userId = req.user._id;
        const { roomId } = req.body;

        if (!roomId) return res.status(400).json({ ok: false, error: "roomId required" });

        const room = await ChatRoom.findOne({ roomId });
        if (!room) return res.status(404).json({ ok: false, error: "Room not found" });

        // Check if user is a member
        const isMember = room.members.some(id => id.toString() === userId.toString());

        if (!isMember) {
            return res.status(403).json({ ok: false, error: "Access denied" });
        }

        return res.status(200).json({ ok: true, room });
    } catch (error) {
        console.error("joinRoomHandler error:", error);
        return res.status(500).json({ ok: false, error: "Server error" });
    }
};