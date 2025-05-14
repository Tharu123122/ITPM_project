import express from 'express';
import {
  createDelivery,
  getDeliveryByOrder,
  updateDeliveryStatus
} from '../controllers/deliveryController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.route('/')
  .post(protect, createDelivery);

router.route('/order/:orderId')
  .get(protect, getDeliveryByOrder);

router.route('/:id/status')
  .put(protect, updateDeliveryStatus);

export default router;