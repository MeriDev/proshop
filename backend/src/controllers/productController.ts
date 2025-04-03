import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel';

//@desc GET ALL PRODUCTS
//@route GET /api/products
//@access public
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find({});

  res.status(200).json(products);
});

//@desc GET SINGLE PRODUCT
//@route GET /api/products/:id
//@access public
const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error('"Product not found');
  }
});

export { getProducts, getProductById };
