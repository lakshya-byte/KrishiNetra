import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
    {
        fromUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        toUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        batchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Batch",
            required: false,   // optional but useful
        },

        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
        },

        review: {
            type: String,
            maxlength: 300,
        },
    },
    { timestamps: true }
);

export const Rating = mongoose.model("Rating", ratingSchema);
