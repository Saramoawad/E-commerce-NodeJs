const express = require('express');
const app = express();
require('dotenv').config();

const connectDB = require('./config/db');
connectDB(); 

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
// const productRoutes = require('./routes/productRoutes');
// const sellerRoutes = require('./routes/sellerRoutes');
// const cartRoutes = require('./routes/cartRoutes');
// const orderRoutes = require('./routes/orderRoutes');
// -------------------------
app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/sellers', sellerRoutes);
// app.use('/api/cart', cartRoutes);
// app.use('/api/orders', orderRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));



