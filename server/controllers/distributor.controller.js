import {Distributor} from "../models/distributor.model.js";
import {Batch} from "../models/batch.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import mongoose from "mongoose";

// https://localhost:8000/api/distributor/all-batches
const getAllBatches = async (req, res) => {
    try {
        const batches = await Batch.find({
            status: {
                $in: ["Listed", "Bidding", "InTransaction", "SoldToDistributor",]
            }
        });
        return res.status(200).json(new ApiResponse(200, batches));
    } catch (err) {
        console.log("Error occured", err);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}

// https://localhost:8000/api/distributor/batch/:id
const getBatchById = async (req, res) => {
    const batchId = req.params.id;
    try {
        const batch = await Batch.findById(batchId);
        if (!batch) {
            return res.status(404).json(new ApiError(404, "Batch not found"));
        }
        return res.status(200).json(new ApiResponse(200, batch));
    } catch (err) {
        console.log("Error occured", err);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}

// http://localhost:8000/api/distributor/my-batches
const getMyBatches = async (req, res) => {
    try {
        const distributor = await Distributor.findOne({userId: req.user._id});
        if (!distributor) {
            return res.status(404).json(new ApiError(404, "Distributor not found"));
        }
        const batches = await Batch.find({
            $expr: {
                $eq: [
                    {$arrayElemAt: ["$tradeHistory.owner", -1]},
                    distributor.userId
                ]
            }
        });

        return res.status(200).json(new ApiResponse(200, batches, "Batches fetched successfully"));
    } catch (error) {
        console.error("Error fetching my batches:", error);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}

// http://localhost:8000/api/distributor/place-bid
const placeBid = async (req, res) => {
    const {id, bidPricePerKg} = req.body;

    if (!id || !bidPricePerKg) {
        return res.status(400).json(new ApiError(400, "Batch ID and bid price are required"));
    }

    try {
        // const distributor = await Distributor.findOne({userId: req.user._id});

        const distributor = await Distributor.findOne({
            userId: new mongoose.Types.ObjectId(req.user._id)
        });

        console.log(distributor, "distributor found")
        if (!distributor) {
            return res.status(404).json(new ApiError(404, "Distributor not found"));
        }

        const batch = await Batch.findById(id);
        console.log(batch, "batch found")
        if (!batch) {
            return res.status(404).json(new ApiError(404, "Batch not found"));
        }

        if (batch.bidding.status !== "Open") {
            return res.status(400).json(new ApiError(400, "Bidding is not open for this batch"));
        }

        if (batch.bidding.closingDate && new Date() > new Date(batch.bidding.closingDate)) {
            batch.bidding.status = "Closed";
            await batch.save();
            console.log( "batch.bidding.closingDate")
            return res.status(400).json(
                new ApiError(400, "Bidding is closed for this batch due to expiry")
            );

        }

        // const alreadyBid = batch.bidding.bids.some(
        //     (bid) => bid.distributorId.toString() === distributor._id.toString()
        // );

        // if (alreadyBid) {
        //     return res.status(400).json(
        //         new ApiError(400, "You have already placed a bid on this batch")
        //     );
        // }

        batch.bidding.bids.push({
            distributorId: distributor._id,
            bidPricePerKg: bidPricePerKg,
            bidDate: Date.now(),
        });
        console.log(batch.bidding.bids, "batch.bidding.bids")

        await batch.save();


        return res
            .status(200)
            .json(new ApiResponse(200, batch, "Bid placed successfully"));

    } catch (error) {
        console.error("Error placing bid:", error);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
};

const EnlistForRetailers = async (req, res) => {
    const {id, pricePerKg} = req.body;
    try {
        const distributor = await Distributor.findOne({userId: req.user._id});
        if (!distributor) {
            return res.status(404).json(new ApiError(404, "Distributor not found"));
        }
        const batch = await Batch.findById(id);
        if (!batch) {
            return res.status(404).json(new ApiError(404, "Batch not found"));
        }
        batch.status = "ListedForRetailers";
        batch.pricePerKg = pricePerKg;
        await batch.save();
        return res.status(200).json(new ApiResponse(200, batch, "Enlisted for retailers successfully"));
    } catch (error) {
        console.error("Error enlisting for retailers:", error);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
};

export {getAllBatches, getBatchById, getMyBatches, placeBid, EnlistForRetailers};