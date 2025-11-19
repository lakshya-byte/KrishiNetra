import { Distributor } from "../models/distributor.model.js";
import { Batch } from "../models/batch.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// https://localhost:8000/api/distributor/all-batches
const getAllBatches = async (req, res) => {
    try{
        const batches = await Batch.find({status:"Listed"});

        return res.status(200).json(new ApiResponse(200, batches));
    }catch(err){
        console.log("Error occured", err);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}

const getBatchById = async (req, res) => {
    const batchId = req.params.id;
    try{
        const batch = await Batch.findById(batchId);
        if(!batch){
            return res.status(404).json(new ApiError(404, "Batch not found"));
        }
        return res.status(200).json(new ApiResponse(200, batch));
    }catch(err){
        console.log("Error occured", err);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}

export { getAllBatches, getBatchById };