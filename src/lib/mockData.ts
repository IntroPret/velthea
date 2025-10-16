import type { Hamper, HamperItem, PackagingOption } from "./types";

export const hampers: Hamper[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Timeless essentials for any occasion.",
    price: 50000,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
    defaultItems: [
      { id: "choc", name: "Artisan Chocolate", price: 45000 },
      { id: "candle", name: "Soy Candle", price: 65000 },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    description: "Elevated picks with a luxe touch.",
    price: 100000,
    image: "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?q=80&w=1200&auto=format&fit=crop",
    defaultItems: [
      { id: "skincare", name: "Skincare Mini", price: 85000 },
      { id: "tea", name: "Herbal Tea", price: 40000 },
    ],
  },
  {
    id: "romantic",
    name: "Romantic",
    description: "Soft scents and sweet notes.",
    price: 75000,
    image: "https://images.unsplash.com/photo-1519681390434-fe5a5f43c9f1?q=80&w=1200&auto=format&fit=crop",
    defaultItems: [
      { id: "rose", name: "Dried Rose Bundle", price: 55000 },
      { id: "truffles", name: "Cocoa Truffles", price: 60000 },
    ],
  },
];

export const itemCatalog: HamperItem[] = [
  { id: "choc", name: "Artisan Chocolate", price: 45000 },
  { id: "candle", name: "Soy Candle", price: 65000 },
  { id: "skincare", name: "Skincare Mini", price: 85000 },
  { id: "tea", name: "Herbal Tea", price: 40000 },
  { id: "rose", name: "Dried Rose Bundle", price: 55000 },
  { id: "truffles", name: "Cocoa Truffles", price: 60000 },
  { id: "journal", name: "Linen Journal", price: 75000 },
  { id: "mug", name: "Ceramic Mug", price: 80000 },
];

export const packagingOptions: PackagingOption[] = [
  { id: "blush", name: "Blush & Cream", color: "#F2DDE1", ribbon: "#E7C4C4" },
  { id: "sage", name: "Sage & Dove", color: "#DCE6DF", ribbon: "#BFD0C4" },
  { id: "navy", name: "Navy & Sand", color: "#D9DEE6", ribbon: "#5D768B" },
  { id: "champagne", name: "Champagne", color: "#EFE4D3", ribbon: "#E3C9A4" },
];