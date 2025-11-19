import {Farmer} from "../models/farmer.model.js";
import {Batch} from "../models/batch.model.js";
import {Dispute} from "../models/dispute.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// http://localhost:8000/api/user/create-dispute
const createDispute = async(req,res) => {
    const {againstUser,batchId,title,description,files} = req.body;
    if(!title || !description){
        return res.status(400).json(new ApiError(400,"Title and description is required"))
    }

    try{
        const dispute = await Dispute.create({
            raisedBy: req.user._id,
            againstUser,
            batchId,
            title,
            description:description,
            files
        });
        return res.status(201).json(new ApiResponse(201,dispute,"Dispute created successfully"))
    }catch(error){
        console.error("Error creating dispute:", error);
        return res.status(500).json(new ApiError(500,"Internal Server error"))
    }
}

const getMyDisputes = async(req,res) => {
    try{
        const disputes = await Dispute.find({raisedBy:req.user._id});
        return res.status(200).json(new ApiResponse(200,disputes,"Disputes fetched successfully"))
    }catch(error){
        console.error("Error fetching disputes:", error);
        return res.status(500).json(new ApiError(500,"Internal Server error"))
    }
}

export {
    createDispute,
    getMyDisputes
}