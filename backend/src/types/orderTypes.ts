import { z } from 'zod';

const orderItemSchema = z.object({
  _id: z.string(),
  name: z.string(),
  qty: z.number(),
  image: z.string(),
  price: z.number(),
  product: z.string(),
});

const shippingAddressSchema = z.object({
  address: z.string(),
  city: z.string(),
  postalCode: z.string(),
  country: z.string(),
});

const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  update_time: z.string(),
  email_address: z.string(),
});

export const createOrderSchema = z.object({
  orderItems: z.array(orderItemSchema),
  shippingAddress: shippingAddressSchema,
  paymentMethod: z.string(),
  itemsPrice: z.number(),
  taxPrice: z.number(),
  shippingPrice: z.number(),
  totalPrice: z.number(),
  user: z.string(),
});

// Type inference
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
