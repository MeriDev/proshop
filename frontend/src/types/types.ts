export interface ProductType {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}
export interface shippingType {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface CartItemType extends ProductType {
  qty: number;
}
