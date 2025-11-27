import { Batch } from "../models/batch.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Retailer} from "../models/retailer.model.js";
import { Distributor } from "../models/distributor.model.js";
import { Farmer } from "../models/farmer.model.js";

// http://localhost:5000/api/retailer/all-listed-batches
const getAllListedBatches = async (req, res, next) => {
    try {
        const retailerId = req.user.id;
        const retailer = await Retailer.findOne({ userId: retailerId });   
        if (!retailer) {
            return res.status(404).json(new ApiError(404, 'Retailer not found'));
        }

        const listedBatches = await Batch.find({ status: 'ListedForRetailers' });

        const detailedBatches = await Promise.all(listedBatches.map(async (batch) => {
            const distributor = await Distributor.findById(batch.distributorId);
            const farmer = await Farmer.findById(batch.farmerId);

            return {
                batch,
                distributor: distributor ? { id: distributor._id, name: distributor.name } : null,
                farmer: farmer ? { id: farmer._id, name: farmer.name } : null,
            };
        }));

        res.status(200).json(new ApiResponse(200, 'Listed batches retrieved successfully', detailedBatches));
    } catch (error) {
        return res.status(500).json(new ApiError(500, 'Internal Server Error'));
    }
};

// http://localhost:5000/api/retailer/buy-lot
const buyLot = async (req, res) => {
    const {id , quantityBought} = req.body;
    const retailerId = req.user.id;

    const retailer = await Retailer.findOne({ userId: retailerId });
    if (!retailer) {
        return res.status(404).json(new ApiResponse(404, 'Retailer not found'));
    }

    const batch = await Batch.findById(id);
    if (!batch) {
        return res.status(404).json(new ApiResponse(404, 'Batch not found'));
    }

    if (batch.availableQuantity < quantityBought) {
        return res.status(400).json(new ApiResponse(400, 'Insufficient quantity available'));
    }

    batch.availableQuantity -= quantityBought;
    batch.retailOrders.push({
        retailerId: retailer._id,
        quantityBought,
        pricePerKg: batch.pricePerKg,

    });
    await batch.save();
    res.status(200).json(new ApiResponse(200, 'Batch purchased successfully', batch));
}; 

// http://localhost:5000/api/retailer/my-batches
const getMyBatches = async (req, res) => {
    const retailerId = req.user.id;

    const retailer = await Retailer.findOne({ userId: retailerId });
    if (!retailer) {
        return res.status(404).json(new ApiResponse(404, 'Retailer not found'));
    }

    const batches = await Batch.find({ 'retailOrders.retailerId': retailer._id });
    res.status(200).json(new ApiResponse(200, 'Batches retrieved successfully', batches));
};

// http://localhost:5000/api/retailer/order-history
const orderHistory = async (req, res) => {
    const retailerId = req.user.id;
    
    const retailer = await Retailer.findOne({ userId: retailerId });
    if (!retailer) {
        return res.status(404).json(new ApiResponse(404, 'Retailer not found'));
    }
    const orders = await Batch.find({ 'retailOrders.retailerId': retailer._id });
    const detailedOrders = orders.map(order => {
        const retailerOrderDetails = order.retailOrders.find(ro => ro.retailerId.toString() === retailer._id.toString());
        return {
            batchId: order._id,
            cropType: order.cropType,
            quantityBought: retailerOrderDetails.quantityBought,
            pricePerKg: retailerOrderDetails.pricePerKg,
            totalPrice: retailerOrderDetails.quantityBought * retailerOrderDetails.pricePerKg,
            orderDate: retailerOrderDetails.orderDate,
            status: order.status,
        };
    });
    res.status(200).json(new ApiResponse(200, 'Orders retrieved successfully', detailedOrders));
};

export { getAllListedBatches, buyLot,getMyBatches, orderHistory };