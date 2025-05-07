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

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;