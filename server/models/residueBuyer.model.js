import mongoose from "mongoose";

const residueBuyerSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true, // one buyer profile per user
        },

        companyName: { type: String, required: true },
        businessType: {
            type: String,
            enum: [
                "Energy Industry",
                "Fuel Production",
                "Organic Processing",
                "Feed and Bedding",
                "Industrial Fiber",
                "Sustainability",
                "Business/Startup",
                "Other",
            ],
            required: true,
        },

        gstNumber: { type: String },
        licenseNumber: { type: String },

        residueRequirements: [
            {
                type: {
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
                        "Other",
                    ],
                    required: true,
                },
                minQuantity: { type: Number, default: 0 }, // tons
                maxQuantity: { type: Number, default: 0 }, // tons
                moisturePreference: {
                    type: String,
                    enum: ["Low", "Medium", "High", "Any"],
                    default: "Any",
                },
            },
        ],

        // Buyer’s location
        location: {
            state: { type: String, required: true },
            district: { type: String, required: true },
            village: { type: String },
            addressLine: { type: String },
            geo: {
                type: {
                    type: String,
                    enum: ["Point"],
                    default: "Point",
                },
                coordinates: {
                    type: [Number], // [longitude, latitude]
                    default: [0, 0],
                },
            },
        },

        // Operational preferences
        maxPickupRadiusKM: { type: Number, default: 100 },
        isVerifiedBuyer: { type: Boolean, default: false },

        // Activity tracking
        lastPurchaseDate: { type: Date },
        totalPurchases: { type: Number, default: 0 },
    },
    { timestamps: true }
);

residueBuyerSchema.index({ "location.geo": "2dsphere" });

export const ResidueBuyer = mongoose.model("ResidueBuyer", residueBuyerSchema);
