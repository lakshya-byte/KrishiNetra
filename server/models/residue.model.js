// models/Residue.js
import mongoose from "mongoose";

const residueSchema = new mongoose.Schema(
    {
        farmer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Farmer",
            required: true,
        },

        residueType: {
            type: String,
            enum: [
                "Paddy Straw",
                "Wheat Straw",
                "Sugarcane Bagasse",
                "Maize Stalk",
                "Cotton Stalk",
                "Banana Fiber",
                "Rice Husk",
                "Groundnut Shells",
                "CornCobs",
                "MixedResidue",
                "Other"
            ],
            required: true,
        },

        quantityTons: { type: Number, required: true }, 
        moistureLevel: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium",
        },

        qualityGrade: {
            type: String,
            enum: ["A", "B", "C"],
            default: "B",
        },

        basePricePerTon: { type: Number, required: true },

        location: {
            state: { type: String, required: true },
            district: { type: String, required: true },
            village: { type: String },
            stateCode: { type: String },
        },

        status: {
            type: String,
            enum: ["Available", "Pending", "Booked", "Sold", "Expired"],
            default: "Available",
        },

        currentBuyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ResidueBuyer",
            default: null,
        },

        expiryDate: { type: Date }, // Optional: auto-expire stale postings
    },
    { timestamps: true }
);

residueSchema.index({ "location.geo": "2dsphere" });

export const Residue = mongoose.model("Residue", residueSchema);
