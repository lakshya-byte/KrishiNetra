import {Farmer} from "../models/farmer.model.js";
import {Distributor} from "../models/distributor.model.js";
import {Retailer} from "../models/retailer.model.js";
import {Batch} from "../models/batch.model.js";
import {Dispute} from "../models/dispute.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// http://localhost:8000/api/user/me
const getMyProfile = async(req,res) => {
    const user = req.user;
    let profile = null;
    
    if(user.role === 'Farmer'){
        profile = await Farmer.findOne({userId:user._id}).populate('userId','name email role address aadharNumber');
    }else if(user.role === 'Distributor'){
        profile = await Distributor.findOne({userId:user._id}).populate('userId','name email role address aadharNumber');
    }else if(user.role === 'Retailer'){
        profile = await Retailer.findOne({userId:user._id}).populate('userId','name email role address aadharNumber');
    }

    if(!profile){
        return res.status(404).json(new ApiError(404,"Profile not found"));
    }

    return res.status(200).json(new ApiResponse(200,profile,"Profile fetched successfully"));
}

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
    getMyDisputes,
    getMyProfile
}