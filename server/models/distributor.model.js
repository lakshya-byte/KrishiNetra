import mongoose from "mongoose";

const distributorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        required: true
    },

    gstNumber: {type:String,unique:true,},
    panNumber:{type:String,unique:true},
    tradeLicenseNumber:{type:String,unique:true},

    // Optional business info
    businessName: { type: String },
    warehouseAddress: { type: String },

    verificationStatus:{
        aadhar:{type:Boolean , default: false},
        pan:{type:Boolean, default:false},
        gst:{type:Boolean, default: false},
        tradeLicense:{type:Boolean, default:false},
    },
    // All batches currently received or handled by distributor
    ownedBatches: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Batch"
        }
    ],
    
}, { timestamps: true });

export const Distributor = mongoose.model("Distributor", distributorSchema);
