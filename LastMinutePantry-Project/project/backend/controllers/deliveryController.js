import express from express;
import Delivery from '../models/deliveryModel.js';

// @desc    Create new delivery
// @route   POST /api/deliveries
// @access  Private
const createDelivery = asyncHandler(async (req, res) => {
  const {
    orderId,
    address,
    preferredTime
  } = req.body;

  const delivery = await Delivery.create({
    order: orderId,
    customer: req.user._id,
    address,
    preferredTime
  });

  if (delivery) {
    res.status(201).json(delivery);
  } else {
    res.status(400);
    throw new Error('Invalid delivery data');
  }
});

// @desc    Get delivery by order ID
// @route   GET /api/deliveries/order/:orderId
// @access  Private
const getDeliveryByOrder = asyncHandler(async (req, res) => {
  const delivery = await Delivery.findOne({ order: req.params.orderId })
    .populate('driver', 'name phone');

  if (delivery) {
    res.json(delivery);
  } else {
    res.status(404);
    throw new Error('Delivery not found');
  }
});

// @desc    Update delivery status
// @route   PUT /api/deliveries/:id/status
// @access  Private
const updateDeliveryStatus = asyncHandler(async (req, res) => {
  const delivery = await Delivery.findById(req.params.id);

  if (delivery) {
    delivery.status = req.body.status;
    if (req.body.driver) {
      delivery.driver = req.body.driver;
    }
    const updatedDelivery = await delivery.save();
    res.json(updatedDelivery);
  } else {
    res.status(404);
    throw new Error('Delivery not found');
  }
});