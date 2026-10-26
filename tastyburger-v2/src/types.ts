export type Category = "burgers" | "fries" | "drinks";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  badge: string;
  minutes: number;
  kcal: number;
  rating: number;
  reviews: number;
  spicy?: boolean;
  vegetarian?: boolean;
  emoji: string;
  color: string;
  image?: string; // optional: set a photo URL/path and it replaces the placeholder
}

export type Cart = Record<number, number>; // productId -> quantity
