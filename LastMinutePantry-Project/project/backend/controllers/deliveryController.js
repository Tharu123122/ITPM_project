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