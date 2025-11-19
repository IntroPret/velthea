import type { Hamper, HamperItem, PackagingOption, BoxSize } from "./types";

export const boxSizes: BoxSize[] = [
  {
    id: "small",
    name: "Small",
    length: 20,
    width: 15,
    price: 10000,
    itemLimit: 2,
  },
  {
    id: "large",
    name: "Large",
    length: 30,
    width: 25,
    price: 20000,
    itemLimit: 3,
  },
];

export const hampers: Hamper[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Timeless essentials for any occasion.",
    image:
      "/images/hampers/classic.jpg",
    boxSizes: [
      { ...boxSizes[0], price: 50000 },
      { ...boxSizes[1], price: 65000 },
    ],
    defaultItems: [],
  },
  {
    id: "premium",
    name: "Premium",
    description: "Elevated picks with a luxe touch.",
    image:
      "/images/hampers/premium.jpg",
    boxSizes: [
      { ...boxSizes[0], price: 100000 },
      { ...boxSizes[1], price: 120000 },
    ],
    defaultItems: [],
  },
  {
    id: "romantic",
    name: "Romantic",
    description: "Soft scents and sweet notes.",
    image:
      "/images/hampers/romantic.jpg",
    boxSizes: [
      { ...boxSizes[0], price: 75000 },
      { ...boxSizes[1], price: 90000 },
    ],
    defaultItems: [],
  },
];

export const itemCatalog: HamperItem[] = [
  { id: "teddyBear", name: "Small Teddy Bear", price: 40000 },
  { id: "flower", name: "Small FLower Bucket", price: 65000 },
  { id: "rocher", name: "Ferrero Rocher", price: 75000 },
  { id: "choc", name: "Chocolate Bar", price: 30000 },
  { id: "lamps", name: "Red Lamps", price: 50000 },
];

export const packagingOptions: PackagingOption[] = [
  { id: "blush", name: "Blush & Cream", color: "#F2DDE1", ribbon: "#E7C4C4" },
  { id: "sage", name: "Sage & Dove", color: "#DCE6DF", ribbon: "#BFD0C4" },
  { id: "navy", name: "Navy & Sand", color: "#D9DEE6", ribbon: "#5D768B" },
  { id: "champagne", name: "Champagne", color: "#EFE4D3", ribbon: "#E3C9A4" },
];