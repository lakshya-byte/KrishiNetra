import { User } from "../models/user.model.js";
import { Farmer } from "../models/farmer.model.js";
import { Batch } from "../models/batch.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// https://localhost:8000/api/farmer/create-batch
const createBatch = async (req, res) => {
    const {batchId, cropType, quantity, pricePerKg,harvestDate,location} = req.body;

    if(!batchId || !cropType || !quantity || !harvestDate){
        return res.status(400).json(new ApiError(400, "All fields are required"));
    }
    console.log(req.user);
    try {
        const farmer = await Farmer.findOne({ userId: req.user._id });
        if (!farmer) {
            return res.status(404).json(new ApiError(404, "Farmer not found"));
        }
        
        const newBatch = await Batch.create({
            batchId,
            farmerId: farmer._id,
            cropType,
            quantity,
            pricePerKg,
            harvestDate,
            location,
            images:[],
            documents:[],
            status:"Created",
            tradeHistory:[
                {
                    owner:req.user._id,
                    pricePerKg,
                    updatedAt: Date.now()
                }
            ],
            rating:{
                overall:0
            }
        });

        return res.status(201).json(new ApiResponse(201, newBatch, "Batch created successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
};

// https://localhost:8000/api/farmer/get-batches
const getMyBatches = async (req, res) => {
    try{
        const farmer = await Farmer.findOne({ userId: req.user._id });
        if (!farmer) {
            return res.status(404).json(new ApiError(404, "Farmer not found"));
        } 
        const batches = await Batch.find({farmerId:farmer._id});

        return res.status(200).json(new ApiResponse(200, batches, "Batches fetched successfully"));
    }catch(error){
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }

};

const enlistBatch = async(req,res) => {
    try{
        const farmer = await Farmer.findOne({ userId: req.user._id });
        if (!farmer) {
            return res.status(404).json(new ApiError(404, "Farmer not found"));
        } 
        const {id} = req.params;
        const batch = await Batch.findOne({batchId:id, farmerId:farmer._id});
        if(!batch){
            return res.status(404).json(new ApiError(404, "Batch not found"));
        }
        batch.status = "Listed";
        await batch.save();
        return res.status(200).json(new ApiResponse(200, batch, "Batch enlisted successfully"));
    }catch(err){
        console.log("Error occured", err);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}

export {
    createBatch,
    getMyBatches,
};