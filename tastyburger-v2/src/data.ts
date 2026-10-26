import type { Product } from "./types";

export const CURRENCY = "$";
export const money = (n: number) => `${CURRENCY}${n.toFixed(2)}`;

export const products: Product[] = [
  { id: 1, name: "Crispy Chicken Zinger", description: "Crispy battered breast, sweet chilli glaze, pickled relish, creamy slaw on a brioche bun.", price: 99.15, category: "burgers", badge: "Best Seller", minutes: 12, kcal: 620, rating: 4.5, reviews: 312, emoji: "🍔", color: "#f3c98b", image: "/images/products/burger-zinger.jpg" },
  { id: 2, name: "Ultimate Bacon Double", description: "Dual smashed Angus patties, hardwood smoked bacon, double aged cheddar.", price: 119.5, category: "burgers", badge: "Chef's Choice", minutes: 15, kcal: 840, rating: 4, reviews: 245, emoji: "🥓", color: "#e9a77b", image: "/images/products/burger-bacon.jpg" },
  { id: 3, name: "Black Sheep Gourmet", description: "Prime charbroiled beef, American melt, ripe avocado slices, tomato relish & rocket.", price: 89, category: "burgers", badge: "Top Rated", minutes: 14, kcal: 710, rating: 4.5, reviews: 189, emoji: "🍔", color: "#d9b27c", image: "/images/products/burger-gourmet.jpg" },
  { id: 4, name: "Green Goddess Vegan", description: "Craft botanical veggie patty, crushed avocado, crisp iceberg, plant-based aioli.", price: 99.25, category: "burgers", badge: "Plant Based", minutes: 10, kcal: 490, rating: 4, reviews: 142, vegetarian: true, emoji: "🥬", color: "#b7d49a", image: "/images/products/burger-veggie.jpg" },
  { id: 5, name: "Firehouse Spicy Smash", description: "Double beef smash, melted pepperjack, torched jalapeños, crispy onion strings.", price: 105, category: "burgers", badge: "Extra Hot", minutes: 12, kcal: 760, rating: 4.5, reviews: 198, spicy: true, emoji: "🌶️", color: "#f08a6b", image: "/images/products/burger-firehouse.jpg" },
  { id: 6, name: "Truffle Mushroom Swiss", description: "Single Angus beef patty, sautéed garlic butter cremini mushrooms, Swiss cheese.", price: 125, category: "burgers", badge: "Gourmet", minutes: 16, kcal: 780, rating: 4.5, reviews: 164, emoji: "🍄", color: "#c9ab8a", image: "/images/products/burger-bacon.jpg" },
  { id: 7, name: "Golden Sea Salt Fries", description: "Double-fried Belgian style hand-cut potatoes, seasoned with flaky sea salt.", price: 45, category: "fries", badge: "Crispy Side", minutes: 6, kcal: 340, rating: 4.5, reviews: 420, vegetarian: true, emoji: "🍟", color: "#f5d36b", image: "/images/products/fries-sea-salt.jpg" },
  { id: 8, name: "Loaded Cheesy Bacon Fries", description: "Crispy hot fries drenched in warm artisanal cheese sauce, crispy bacon bits.", price: 75, category: "fries", badge: "Crowd Favorite", minutes: 8, kcal: 580, rating: 4.5, reviews: 382, emoji: "🧀", color: "#f2b95c", image: "/images/products/fries-loaded.jpg" },
  { id: 9, name: "Truffle & Shaved Parmesan Fries", description: "Golden skin-on fries drizzled with white truffle oil, 24-month aged parmesan.", price: 85, category: "fries", badge: "Chef Choice", minutes: 8, kcal: 430, rating: 4.5, reviews: 215, vegetarian: true, emoji: "🍟", color: "#e8c98a", image: "/images/products/fries-parmesan.jpg" },
  { id: 10, name: "Fiery Peri-Peri Curly Fries", description: "Crisp spiral cut curly fries tossed in our zesty South African peri-peri spice dust.", price: 65, category: "fries", badge: "Spicy", minutes: 7, kcal: 420, rating: 4, reviews: 176, spicy: true, vegetarian: true, emoji: "🌶️", color: "#ee9a6c", image: "/images/products/fries-peri-peri.jpg" },
  { id: 11, name: "Salted Caramel Pretzel Shake", description: "Creamy Madagascar vanilla custard blended with buttery salted caramel, pretzel bits.", price: 55, category: "drinks", badge: "Sweet Treat", minutes: 5, kcal: 510, rating: 4.5, reviews: 154, vegetarian: true, emoji: "🥤", color: "#d8b9a0", image: "/images/products/shake.jpg" },
  { id: 12, name: "Sparkling Mint Lime Cooler", description: "Fresh squeezed Persian limes, muddled garden mint, sparkling water and raw cane.", price: 35, category: "drinks", badge: "Refreshing", minutes: 3, kcal: 180, rating: 4.5, reviews: 98, vegetarian: true, emoji: "🍹", color: "#a9d9c0", image: "/images/products/cooler.jpg" },
];

export const categories = [
  { id: "all", label: "All Flavors", icon: "🍽️" },
  { id: "burgers", label: "Crazy Burgers", icon: "🍔" },
  { id: "fries", label: "Crispy & Loaded Fries", icon: "🍟" },
  { id: "drinks", label: "Drinks & Shakes", icon: "🥤" },
] as const;
