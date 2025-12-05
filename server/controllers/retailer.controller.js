import { Batch } from "../models/batch.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Retailer} from "../models/retailer.model.js";
import { Distributor } from "../models/distributor.model.js";
import { Farmer } from "../models/farmer.model.js";
import crypto from "crypto";
import { RetailPayment } from "../models/retailPayment.model.js";
import { razorpayInstance } from "../utils/Razorpay.js";

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
    const { id, quantityBought } = req.body;
    const retailerId = req.user.id;

    const retailer = await Retailer.findOne({ userId: retailerId });
    if (!retailer) return res.status(404).json(new ApiError(404, "Retailer not found"));

    const batch = await Batch.findById(id);
    if (!batch) return res.status(404).json(new ApiError(404, "Batch not found"));

    if (batch.availableQuantity < quantityBought) {
        return res.status(400).json(new ApiError(400, "Insufficient quantity"));
    }

    const totalAmount = quantityBought * batch.pricePerKg * 100; 

    // Razorpay order
    const order = await razorpayInstance.orders.create({
        amount: totalAmount,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
    });

    // Save payment record
    const payment = await RetailPayment.create({
        retailerId: retailer._id,
        batchId: batch._id,
        quantity: quantityBought,
        totalAmount: totalAmount / 100,
        razorpayOrderId: order.id,
        status: "PENDING"
    });

    res.status(200).json(new ApiResponse(200, "Order initiated", {
        order,
        paymentId: payment._id
    }));
};

// http://localhost:5000/api/retailer/verify-payment
const verifyPayment = async (req, res) => {
    const { paymentId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const payment = await RetailPayment.findById(paymentId);
    if (!payment) return res.status(404).json(new ApiError(404, "Payment record not found"));

    const expectedSig = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

    if (expectedSig !== razorpay_signature) {
        payment.status = "FAILED";
        await payment.save();
        return res.status(400).json(new ApiError(400, "Invalid payment signature"));
    }

    // Update payment
    payment.status = "PAID";
    payment.razorpayPaymentId = razorpay_payment_id;
    payment.razorpaySignature = razorpay_signature;
    await payment.save();

    // UPDATE BATCH NOW
    const batch = await Batch.findById(payment.batchId);
    batch.availableQuantity -= payment.quantity;
    batch.retailOrders.push({
        retailerId: payment.retailerId,
        quantityBought: payment.quantity,
        pricePerKg: batch.pricePerKg,
        paymentId: payment._id,
        purchaseDate: new Date()
    });

    await batch.save();

    res.status(200).json(new ApiResponse(200, "Payment verified & purchase complete"));
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

export { getAllListedBatches, buyLot, verifyPayment, getMyBatches, orderHistory };