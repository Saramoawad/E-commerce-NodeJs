const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const { name, description, photo} = req.body;
    const sellerId = req.user.userId;

    const product = new Product({
      name,
      description,
      photo,
      seller: sellerId
    });

    await product.save();
    res.status(201).json({message:'Product created',product});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.userId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id, seller: req.user.userId });

    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    Object.assign(product, req.body);
    await product.save();
    res.status(200).json({ message: 'Product updated', product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOneAndDelete({ _id: id, seller: req.user.userId });

    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    const products = await Product.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
      ]
    }).populate('seller', 'name');

    
    const sellerMatches = await Product.find()
      .populate({
        path: 'seller',
        match: { name: { $regex: q, $options: 'i' } },
        select: 'name'
      });

    const filtered = [
      ...products,
      ...sellerMatches.filter(p => p.seller !== null)
    ];

    const unique = Array.from(new Set(filtered.map(p => p._id.toString())))
      .map(id => filtered.find(p => p._id.toString() === id));

    res.json(unique);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
