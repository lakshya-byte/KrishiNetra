import {Farmer} from "../models/farmer.model.js";
import {Distributor} from "../models/distributor.model.js";
import {Retailer} from "../models/retailer.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {User} from "../models/user.model.js";
import { Batch } from "../models/batch.model.js";

const getAllFarmers = async(req,res) =>{
    try {
        const farmers = await Farmer.find().populate('userId', '-password -refreshToken');
        return res.status(200).json(new ApiResponse(200, farmers));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Something went wrong while fetching farmers"));
    }
};

const getAllDistributors = async(req,res) =>{
    try {
        const distributors = await Distributor.find().populate('userId', '-password -refreshToken');
        return res.status(200).json(new ApiResponse(200, distributors));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Something went wrong while fetching distributors"));
    }
};

const getAllRetailers = async(req,res) =>{
    try {
        const retailers = await Retailer.find().populate('userId', '-password -refreshToken');
        return res.status(200).json(new ApiResponse(200, retailers));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Something went wrong while fetching retailers"));
    }
};

const getAllBatches = async(req,res) =>{
    try {
        const batches = await Batch.find().populate('farmerId');
        return res.status(200).json(new ApiResponse(200, batches));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Something went wrong while fetching batches"));
    }
}

export {getAllFarmers, getAllDistributors, getAllRetailers,getAllBatches};