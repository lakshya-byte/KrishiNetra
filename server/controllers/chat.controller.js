import {ChatRoom} from "../models/chat.model.js";
import mongoose from "mongoose";

/**
 * createPrivateRoom
 *
 * Creates (or returns existing) a private chat room between authenticated user and `otherUserId`.
 *
 * Detailed behavior:
 * - Validates input and objectId format.
 * - Prevents creating a room with yourself.
 * - Builds canonical roomId using sorted userIds: `private:<smallerId>:<largerId>`.
 * - If room exists -> return it. Otherwise create ChatRoom with exactly two members.
 *
 * Response:
 *  - 200 + { ok: true, room } on success
 *  - 400 for bad input
 *  - 500 for server errors
 */
export const createPrivateRoom = async (req, res) => {
    try {
        // authenticated user id (from verifyJWT middleware)
        const userId = req.user._id;
        const {otherUserId} = req.body;
        console.log("otherUserId", otherUserId, "userId", userId)

        // validate otherUserId present & format
        if (!otherUserId) return res.status(400).json({ok: false, error: "otherUserId required"});
        if (!mongoose.Types.ObjectId.isValid(otherUserId))
            return res.status(400).json({ok: false, error: "otherUserId is not a valid ObjectId"});

            // prevent creating room with self
        if (userId.toString() === otherUserId.toString())
            return res.status(400).json({ok: false, error: "Cannot create private room with yourself"});


        // basic validation: otherUserId required
        if (!otherUserId) {
            return res.status(400).json({ok: false, error: "otherUserId required"});
        }

        // ensure valid MongoDB ObjectId for otherUserId
        if (!mongoose.Types.ObjectId.isValid(otherUserId)) {
            return res.status(400).json({ok: false, error: "otherUserId is not a valid id"});
        }


        // create canonical sorted roomId so room is unique regardless of who creates it
        const u1 = userId.toString();
        const u2 = otherUserId.toString();
        const roomId = `private:${[u1, u2].sort().join(":")}`;

        // try to find existing room first (idempotent)
        let room = await ChatRoom.findOne({roomId});

        // if not found, create
        if (!room) {
            room = await ChatRoom.create({
                roomId,
                type: "private",
                refId: null,
                createdBy: new mongoose.Types.ObjectId(userId),
                members: [
                    new mongoose.Types.ObjectId(userId),
                    new mongoose.Types.ObjectId(otherUserId),
                ],
            });

            // return newly created room
            return res.status(200).json({ok: true, room});
        }

        // room already exists — return it
        return res.status(200).json({ok: true, room});
    } catch (error) {
        // log and return server error (avoid leaking internal stack)
        console.error("createPrivateRoom error:", error);
        return res.status(500).json({ok: false, error: error.message || "Server error"});
    }
};

/**
 * joinRoomHandler
 *
 * REST helper for joining a room (used by clients before/or in addition to socket join).
 *
 * Detailed behavior:
 * - Validates `roomId` input.
 * - Ensures room exists.
 * - Checks access rules:
 *    - For private rooms: only the two members may join.
 *    - For dispute rooms: only members or admins may join (admin check left to middleware/role check).
 * - Optionally (if caller isn't a member) will add the user to the room (useful for some room types).
 *
 * Note: actual socket join should still be performed on the Socket.IO side (socket.join(roomId)).
 */

export const joinRoomHandler = async (req, res) => {
    try {
        // authenticated user id
        const userId = req.user._id;
        const {roomId} = req.body;

        // validate input presence
        if (!roomId) {
            return res.status(400).json({ok: false, error: "roomId required"});
        }

        // find room by roomId
        const room = await ChatRoom.findOne({roomId});
        if (!room) {
            return res.status(404).json({ok: false, error: "Room not found"});
        }

        // convert members to string ids for easy checks
        const memberIds = (room.members || []).map((m) => m.toString());
        const isMember = memberIds.includes(userId.toString());

        // access rules for private room: only the two members allowed
        if (room.type === "private") {
            // ensure exactly 2 members stored in room (data integrity)
            if (memberIds.length !== 2) {
                // if data corrupted, return error
                return res.status(400).json({ok: false, error: "Private room malformed"});
            }

            // if requester is not one of the two members -> forbidden
            if (!isMember) {
                return res.status(403).json({ok: false, error: "Forbidden: not a member of this private room"});
            }

            // allowed: return success + room
            return res.status(200).json({ok: true, room});
        }

        // access rules for dispute room: only listed members (e.g., raiser, admin, assigned staff) can join
        if (room.type === "dispute") {
            if (!isMember) {
                return res.status(403).json({ok: false, error: "Forbidden: not a member of this dispute room"});
            }
            return res.status(200).json({ok: true, room});
        }

        // fallback: for any other room types, require membership
        if (!isMember) {
            return res.status(403).json({ok: false, error: "Forbidden: not a member of this room"});
        }

        // default success
        return res.status(200).json({ok: true, room});
    } catch (error) {
        console.error("joinRoomHandler error:", error);
        return res.status(500).json({ok: false, error: error.message || "Server error"});
    }
};

