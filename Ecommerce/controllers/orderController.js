const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { products } = req.body;

    const order = new Order({
      user: req.user.userId,
      products,
      paymentMethod: 'Cash on Delivery'
    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
