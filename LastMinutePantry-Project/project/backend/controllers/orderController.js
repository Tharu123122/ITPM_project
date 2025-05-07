import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Delivery from '../models/deliveryModel.js';
import Product from '../models/productModel.js';

// @desc    Create new order or reservation
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const {
    items,
    deliveryAddress,
    preferredDeliveryTime,
    type
  } = req.body;

  if (!items || items.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  // Calculate total amount and verify products
  let totalAmount = 0;
  const orderItems = [];

  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product) {
      res.status(404);
      throw new Error(`Product not found: ${item.product}`);
    }

    orderItems.push({
      product: item.product,
      quantity: item.quantity,
      price: product.discountedPrice
    });

    totalAmount += product.discountedPrice * item.quantity;
  }

  const order = await Order.create({
    customer: req.user._id,
    items: orderItems,
    totalAmount,
    type
  });

  if (order) {
    // If it's a delivery order, create a delivery record
    if (type === 'order' && deliveryAddress) {
      await Delivery.create({
        order: order._id,
        customer: req.user._id,
        address: {
          street: deliveryAddress.street,
          city: deliveryAddress.city,
          postalCode: deliveryAddress.postalCode,
          instructions: deliveryAddress.instructions
        },
        preferredTime: preferredDeliveryTime
      });
    }

    res.status(201).json(order);
  } else {
    res.status(400);
    throw new Error('Invalid order data');
  }
});

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ customer: req.user._id })
    .populate('items.product')
    .sort('-createdAt');
  res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('items.product')
    .populate('customer', 'name email');

  if (order && (order.customer._id.toString() === req.user._id.toString() || req.user.role === 'admin')) {
    // If it's a delivery order, include delivery information
    if (order.type === 'order') {
      const delivery = await Delivery.findOne({ order: order._id })
        .populate('driver', 'name phone');
      res.json({ ...order.toObject(), delivery });
    } else {
      res.json(order);
    }
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = req.body.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus
};