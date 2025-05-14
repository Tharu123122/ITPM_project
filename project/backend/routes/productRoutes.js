import express from 'express';
import {
  createProduct,
  getVendorProducts,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getVendorStats
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
import { vendor } from '../middleware/vendorMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, vendor, createProduct)
  .get(getAllProducts);

router.get('/vendor', protect, vendor, getVendorProducts);
router.get('/stats', protect, vendor, getVendorStats);

router.route('/:id')
  .get(getProductById)
  .put(protect, vendor, updateProduct)
  .delete(protect, vendor, deleteProduct);

export default router;