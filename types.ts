export enum ViewState {
  HOME = 'HOME',
  CATALOG = 'CATALOG',
  PROFILE = 'PROFILE',
  TESTIMONIALS = 'TESTIMONIALS',
  CONTACT = 'CONTACT',
  CART = 'CART',
  CHECKOUT = 'CHECKOUT',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
  variantSize: string; // e.g., 'Regular', 'Large'
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  role?: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hours: string;
  instagram: string;
  instagramUrl: string;
}