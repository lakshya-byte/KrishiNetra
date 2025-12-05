import { User } from "../models/user.model.js";
import { Farmer } from "../models/farmer.model.js";
import { Batch } from "../models/batch.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Distributor } from "../models/distributor.model.js";

// http://localhost:8000/api/farmer/create-batch
const createBatch = async (req, res) => {
    const {
        batchId,
        cropType,
        quantity,
        pricePerKg,
        harvestDate,
        location,
        additionalDetails,
        images
    } = req.body;

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
            availableQuantity:quantity,
            pricePerKg,
            harvestDate,
            location,
            images:images || [],
            documents:[],
            status:"Created",
            tradeHistory:[
                {
                    owner:req.user._id,
                    pricePerKg,
                    updatedAt: Date.now()
                }
            ],
            additionalDetails :additionalDetails || {},
            rating:{
                overall:0
            }
        });

        return res.status(201).json(new ApiResponse(201, newBatch, "Batch created successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
        console.log(error);
    }
};

// http://localhost:8000/api/farmer/get-batches
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

// POST http://localhost:8000/api/farmer/enlist-batch
const enlistBatch = async (req, res) => {
    try {
        const farmer = await Farmer.findOne({ userId: req.user._id });
        if (!farmer) {
            return res.status(404).json({ message: "Farmer not found" });
        }
        const { id} = req.body;
        console.log(id)
        const batch = await Batch.findOne({ _id: id, farmerId: farmer._id });
        if (!batch) {
            return res.status(404).json({ message: "hi everyone" });
        }
        batch.status = "Listed";
        await batch.save();
        return res.status(200).json({
            message: "Batch enlisted successfully",
            data: batch
        });
    } catch (err) {
        console.log("Error occured", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// http://localhost:8000/api/farmer/start-bidding
const startBidding = async(req,res) => {
    const {id,closingDate} = req.body;
    try{
        const farmer = await Farmer.findOne({ userId: req.user._id });
        if (!farmer) {
            return res.status(404).json(new ApiError(404, "Farmer not found"));
        } 
        const batch = await Batch.findOne({_id:id, farmerId:farmer._id});
        if(!batch){
            return res.status(404).json(new ApiError(404, "Batch not found"));
        }
        batch.status = "Bidding";
        batch.bidding.status = "Open";
        batch.bidding.closingDate = closingDate ? new Date(closingDate) : new Date(Date.now() + 7*24*60*60*1000); // 7 days from now
        await batch.save();
        return res.status(200).json(new ApiResponse(200, batch, "Batch enlisted successfully"));
    }catch(err){
        console.log("Error occured", err);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    } 
}

// http://localhost:8000/api/farmer/stop-bidding
const stopBidding = async(req,res) => {
    const {id} = req.body;
    try{
        const farmer = await Farmer.findOne({ userId: req.user._id });
        if (!farmer) {
            return res.status(404).json(new ApiError(404, "Farmer not found"));
        } 
        const batch = await Batch.findOne({_id:id, farmerId:farmer._id});
        if(!batch){
            return res.status(404).json(new ApiError(404, "Batch not found"));
        }
        batch.bidding.status = "Closed";
        batch.status = "InTransaction";
        batch.bidding.biddingWinner = batch.bidding.bids.reduce((maxBid, currentBid) => {
            return currentBid.bidPricePerKg > maxBid.bidPricePerKg ? currentBid : maxBid;
        }, batch.bidding.bids[0]).distributorId;
        await batch.save();
        return res.status(200).json(new ApiResponse(200, batch, "Bidding stopped successfully"));
    }catch(err){
        console.log("Error occured", err);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    } 
}

// http://localhost:8000/api/farmer/complete-transaction
const completeTransaction = async(req,res) => {
    const {id} = req.body;
    try{
        const farmer = await Farmer.findOne({ userId: req.user._id });
        if (!farmer) {
            return res.status(404).json(new ApiError(404, "Farmer not found"));
        } 
        const batch = await Batch.findOne({_id:id, farmerId:farmer._id});
        if(!batch){
            return res.status(404).json(new ApiError(404, "Batch not found"));
        }
        const winningUser = await Distributor.findById(batch.bidding.biddingWinner);
        batch.tradeHistory.push({
            owner: winningUser.userId,
            pricePerKg: batch.bidding.bids.find(bid => bid.distributorId.toString() === batch.bidding.biddingWinner.toString()).bidPricePerKg,
            updatedAt: Date.now()
        });
        batch.status = "SoldToDistributor";
        await batch.save();
        return res.status(200).json(new ApiResponse(200, batch, "Transaction completed successfully"));
    }catch(err){
        console.log("Error occured", err);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    } 
}

// http://localhost:8000/api/farmer/update-batch
const updateBatch = async(req,res) => {
    // To be implemented
    const {id, updates} = req.body;

    try{
        const farmer = await Farmer.findOne({ userId: req.user._id });
        if (!farmer) {
            return res.status(404).json(new ApiError(404, "Farmer not found"));
        } 
        const batch = await Batch.findOne({_id:id, farmerId:farmer._id});
        if(!batch){
            return res.status(404).json(new ApiError(404, "Batch not found"));
        }

        // Apply updates
        for(const key in updates){
            batch[key] = updates[key];
        }
        await batch.save();
        return res.status(200).json(new ApiResponse(200, batch, "Batch updated successfully"));
    }catch(error){
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}

export {
    createBatch,
    getMyBatches,
    enlistBatch,
    updateBatch,
    startBidding,
    stopBidding,
    completeTransaction
};
