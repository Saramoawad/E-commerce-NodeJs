const Cart = require('../models/Cart');

exports.createCart = async (req, res) => {
  try {
    const { products } = req.body;

    const cart = new Cart({
      user: req.user.userId,
      products,
    });

    await cart.save();
    res.status(201).json({ message: 'Cart created', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { products } = req.body;

    const cart = await Cart.findById(id);
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    if (req.user.userId !== cart.user.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not allowed to update this cart' });
    }

    cart.products = products;
    await cart.save();

    res.status(200).json({ message: 'Cart updated', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
