import mongoose from "mongoose";
 
const batchSchema = new mongoose.Schema({
    batchId: {
        type:String,
        unique:true,
        required:true,
    },
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farmer",
        required: true,
    },
    cropType: { type: String, required: true },
    quantity: { type: Number, required: true },
    pricePerKg: { type: Number, required: true },
    harvestDate: { type: Date, required: true },
    location: { type: String, required: true },

    images: [{ 
        name: String,
        desc:String,
        url:String
    }],        // Cloudinary/S3 links
    documents: [{ 
        name: String,
        desc:String,
        url:String
    }],     // optional certificates
    // Status of the batch
    status: {
        type: String,
        enum: [
            "Created",
            "Listed",
            "Bidding",
            "SoldToDistributor",
            "ListedForRetailers",
            "SoldToRetailer",
            "Completed",
        ],
        default: "Created",
    },
    tradeHistory: [
        {
            owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            pricePerKg: Number,
            updatedAt: Date,
        },
    ],
    bidding:{
        status:{type:String, enum:["Open","Closed"], default:"Closed"},
        closingDate:{type:Date},
        bids:[
            {
                user:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
                bidPricePerKg: Number,
                bidDate: Date,
            }
        ]
    },
    expiryDate: { type: Date },
    additionalDetails:{
        moistureContent:{type:Number},
        purity:{type:Number},
        grade:{type:String},
    },
    rating:{
        overall:Number,
        distribution:{
            1:Number,
            2:Number,
            3:Number,
            4:Number,
            5:Number
        }
    }
}, { timestamps: true }
)

export const Batch = mongoose.model("Batch", batchSchema)