import express from 'express';
import {
  createDelivery,
  getDeliveryByOrder,
  updateDeliveryStatus
} from '../controllers/deliveryController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();