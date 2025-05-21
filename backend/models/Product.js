const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  lowStockThreshold: {
    type: Number,
    default: 10
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Virtual for checking if product is low in stock
productSchema.virtual('isLowStock').get(function() {
  return this.quantity <= this.lowStockThreshold;
});

module.exports = mongoose.model('Product', productSchema); 