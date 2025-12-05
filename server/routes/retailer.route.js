import express from 'express';
import {getAllListedBatches , buyLot,orderHistory,getMyBatches, verifyPayment} from '../controllers/retailer.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/all-listed-batches', verifyJWT, getAllListedBatches);
router.post('/verify-payment', verifyJWT, verifyPayment);
router.post('/buy-lot', verifyJWT, buyLot);
router.get('/my-batches', verifyJWT, getMyBatches);
router.get('/order-history', verifyJWT, orderHistory);

export default router;