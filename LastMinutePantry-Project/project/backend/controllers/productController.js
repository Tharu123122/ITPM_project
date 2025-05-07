import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Vendor
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    image,
    originalPrice,
    discountedPrice,
    quantity,
    expiryDate,
    category
  } = req.body;

  const product = await Product.create({
    vendor: req.user._id,
    name,
    description,
    image,
    originalPrice,
    discountedPrice,
    quantity,
    expiryDate,
    category
  });

  if (product) {
    res.status(201).json(product);
  } else {
    res.status(400);
    throw new Error('Invalid product data');
  }
});

// @desc    Get vendor's products
// @route   GET /api/products/vendor
// @access  Private/Vendor
const getVendorProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ vendor: req.user._id });
  res.json(products);
});

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isAvailable: true })
    .populate('vendor', 'name businessType');
  res.json(products);
});

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate('vendor', 'name businessType');

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Vendor
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Verify product belongs to vendor
  if (product.vendor.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this product');
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedProduct);
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Vendor
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Verify product belongs to vendor
  if (product.vendor.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this product');
  }

  await product.deleteOne();
  res.json({ message: 'Product removed' });
});

// @desc    Get vendor stats
// @route   GET /api/products/stats
// @access  Private/Vendor
const getVendorStats = asyncHandler(async (req, res) => {
  const stats = await Product.aggregate([
    {
      $match: { vendor: req.user._id }
    },
    {
      $group: {
        _id: null,
        totalProducts: { $sum: 1 },
        averageDiscount: {
          $avg: {
            $multiply: [
              {
                $divide: [
                  { $subtract: ['$originalPrice', '$discountedPrice'] },
                  '$originalPrice'
                ]
              },
              100
            ]
          }
        }
      }
    }
  ]);

  const expiringProducts = await Product.find({
    vendor: req.user._id,
    expiryDate: {
      $gte: new Date(),
      $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Next 7 days
    }
  }).count();

  res.json({
    totalProducts: stats[0]?.totalProducts || 0,
    averageDiscount: Math.round(stats[0]?.averageDiscount || 0),
    expiringProducts
  });
});

export {
  createProduct,
  getVendorProducts,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getVendorStats
};