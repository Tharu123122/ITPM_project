import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['customer', 'vendor', 'driver', 'admin'],
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    // Fields for vendors
    businessType: {
        type: String,
        required: function() { return this.role === 'vendor'; },
      },
      registrationNumber: {
        type: String,
        required: function() { return this.role === 'vendor'; },
      },
      establishedYear: {
        type: String,
        required: function() { return this.role === 'vendor'; },
      },
      openingHours: {
        type: String,
        required: function() { return this.role === 'vendor'; },
      },
      isConnected: {
        type: Boolean,
        default: true,
        required: function() { return this.role === 'vendor'; },
      },
      // Fields for drivers
      licenseNumber: {
        type: String,
        required: function() { return this.role === 'driver'; },
      },
      vehicleLicenseNumber: {
        type: String,
        required: function() { return this.role === 'driver'; },
      },
      nicNumber: {
        type: String,
        required: function() { return this.role === 'driver'; },
      },
      vehicleType: {
        type: String,
        required: function() { return this.role === 'driver'; },
      },
    },
    {
      timestamps: true,
    }
  );