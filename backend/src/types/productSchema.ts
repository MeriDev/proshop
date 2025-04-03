import { z } from 'zod';

const reviewSchema = z.object({
  user: z.string(),
  name: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
  createdAt: z.date().optional(),
});

export const productSchema = z.object({
  user: z.string(),
  name: z.string().min(1, 'Name is required'),
  image: z.string().min(1, 'Image is required'),
  brand: z.string().min(1, 'Brand is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  reviews: z.array(reviewSchema).default([]),
  rating: z.number().min(0).max(5).default(0),
  numReviews: z.number().nonnegative().default(0),
  price: z.number().positive('Price must be greater than 0'),
  countInStock: z.number().nonnegative('Count in stock must be 0 or greater'),
});

// Create product schema (omit fields that are set by server)
export const createProductSchema = productSchema.omit({
  user: true,
  reviews: true,
  rating: true,
  numReviews: true,
});

// Update product schema (all fields optional except id)
export const updateProductSchema = createProductSchema.partial();

// Create review schema
export const createReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(1, 'Review comment is required'),
});

export type ProductSchema = z.infer<typeof productSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
