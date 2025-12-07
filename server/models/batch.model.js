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
        images: [String],
        documents: [{
            name: String,
            desc:String,
            url:String
        }],
        status: {
            type: String,
            enum: [
                "Created",
                "Listed",
                "Bidding",
                "InTransaction",
                "SoldToDistributor",
                "ListedForRetailers",
                "Finished",
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
                    distributorId:{ type: mongoose.Schema.Types.ObjectId, ref: "Distributor" },
                    bidPricePerKg: Number,
                    bidDate: Date,
                }
            ],
            biddingWinner:{ type: mongoose.Schema.Types.ObjectId, ref: "Distributor" }
        },
        availableQuantity: { type: Number, required: true },
        retailOrders: [
            {
                retailerId: { type: mongoose.Schema.Types.ObjectId, ref: "Retailer" },
                quantityBought: Number,
                pricePerKg: Number,
                paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "RetailPayment" },
                purchaseDate: { type: Date, default: Date.now }
            }
        ],
        expiryDate: { type: Date },
        additionalDetails:{
            moistureContent:{type:Number},
            purity:{type:Number},
            grade:{type:String},
            temperature:{type:Number},
            nitrogen:{type:Number},
            phosphorus:{type:Number},
            potassium:{type:Number},
            yieldPercentage:{type:Number},
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

export const Batch = mongoose.model("Batch", batchSchema);
