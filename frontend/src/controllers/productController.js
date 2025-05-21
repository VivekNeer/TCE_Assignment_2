
const Product = require('../models/Product');

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, lowStockThreshold } = req.body;
    
    const product = await Product.create({
      name,
      description,
      price,
      quantity,
      lowStockThreshold: lowStockThreshold || 10
    });
    
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    
    // Add low stock warning to response
    const productsWithStockInfo = products.map(product => {
      const productObj = product.toObject();
      productObj.isLowStock = product.quantity <= product.lowStockThreshold;
      return productObj;
    });
    
    res.json(productsWithStockInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (product) {
      const productObj = product.toObject();
      productObj.isLowStock = product.quantity <= product.lowStockThreshold;
      res.json(productObj);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    // Check if error is due to invalid ID format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, quantity, lowStockThreshold } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Update product fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price !== undefined ? price : product.price;
    product.quantity = quantity !== undefined ? quantity : product.quantity;
    product.lowStockThreshold = lowStockThreshold || product.lowStockThreshold;
    
    await product.save();
    
    // Check if stock is low after update
    const isLowStock = product.quantity <= product.lowStockThreshold;
    
    const updatedProduct = product.toObject();
    updatedProduct.isLowStock = isLowStock;
    
    // Add low stock warning in response if applicable
    if (isLowStock) {
      updatedProduct.stockWarning = `Low stock alert: ${product.name} has only ${product.quantity} items left`;
    }
    
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    // Check if error is due to invalid ID format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    await product.deleteOne();
    
    res.json({ message: 'Product removed successfully' });
  } catch (error) {
    console.error(error);
    // Check if error is due to invalid ID format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Restock product
// @route   POST /api/products/:id/restock
// @access  Private/Admin
exports.restockProduct = async (req, res) => {
  try {
    const { quantity } = req.body;
    
    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Please provide a valid quantity to restock' });
    }
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Add to existing quantity
    product.quantity += Number(quantity);
    
    await product.save();
    
    const isLowStock = product.quantity <= product.lowStockThreshold;
    
    res.json({ 
      message: `Successfully restocked ${product.name}. New quantity: ${product.quantity}`,
      product: {
        ...product.toObject(),
        isLowStock
      }
    });
  } catch (error) {
    console.error(error);
    // Check if error is due to invalid ID format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get low stock products
// @route   GET /api/products/low-stock
// @access  Private/Admin
exports.getLowStockProducts = async (req, res) => {
  try {
    // Find all products where quantity is less than or equal to the threshold
    const products = await Product.find({}).exec();
    
    const lowStockProducts = products.filter(product => 
      product.quantity <= product.lowStockThreshold
    );
    
    if (lowStockProducts.length === 0) {
      return res.json({ message: 'No products are currently low in stock', products: [] });
    }
    
    res.json({
      message: `${lowStockProducts.length} products are low in stock`,
      products: lowStockProducts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
