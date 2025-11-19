import mongoose from "mongoose";

const disputeSchema = new mongoose.Schema(
    {
        raisedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        againstUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false, // sometimes dispute is against system, not person
        },

        batchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Batch",
            required: false,
        },

        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        files:[
            {
                name: String,
                desc:String,
                url:String
            }
        ],

        status: {
            type: String,
            enum: ["Pending", "In-Review", "Assigned", "Resolved", "Rejected"],
            default: "Pending",
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // admin or support staff
            required: false,
        },

        resolutionComment: {
            type: String,
        },

        resolutionDate: {
            type: Date,
        },
        resolvedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        }
    },
    { timestamps: true }
);

export const Dispute = mongoose.model("Dispute", disputeSchema);