import colors from 'colors';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import products from './data/products.js';

dotenv.config();

const app = express();

// Enable CORS for all routes
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/products', (req, res) => {
  res.status(200).json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);

  res.status(200).json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.magenta);
});
