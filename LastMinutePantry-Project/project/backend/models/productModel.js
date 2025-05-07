import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    originalPrice: {
      type: Number,
      required: true,
      min: 0
    },
    discountedPrice: {
      type: Number,
      required: true,
      min: 0
    },
    quantity: {
      type: String,
      required: true
    },
    expiryDate: {
      type: Date,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: ['Bakery', 'Dairy', 'Fruits', 'Vegetables', 'Meat', 'Grocery', 'Other']
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;