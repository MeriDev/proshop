import 'colors';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import express from 'express';

import connectDB from './config/db';
import { errorHandler, notFound } from './middleware/errorMiddleware';

import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta
      .bold
  );
});
