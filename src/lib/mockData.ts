import type {
  Hamper,
  HamperItem,
  PackagingOption,
  BoxSize,
  LidPersonalizationOption,
} from "./types";

export const boxSizes: BoxSize[] = [
  {
    id: "small",
    name: "Small",
    length: 21,
    width: 21,
    height: 4.5,
    price: 0,
    itemLimit: 2,
  },
  {
    id: "medium",
    name: "Medium",
    length: 22,
    width: 22,
    height: 8,
    price: 0,
    itemLimit: 3,
  },
  {
    id: "medium-hardbox",
    name: "Medium Hardbox",
    length: 23,
    width: 17,
    height: 7,
    price: 0,
    itemLimit: 3,
  },
  {
    id: "large",
    name: "Large",
    length: 24,
    width: 24,
    height: 7,
    price: 0,
    itemLimit: 4,
  },
];

export const hampers: Hamper[] = [
  {
    id: "regular",
    name: "Regular",
    description: "Warm and timeless hamper available in small, medium, or large sizes.",
    image: "/images/hampers/regular.jpg",
    boxSizes: [
      { ...boxSizes[0], price: 40000 },
      { ...boxSizes[1], price: 50000 },
      { ...boxSizes[3], price: 60000 },
    ],
    defaultItems: [],
  },
  {
    id: "hardbox",
    name: "Hard Box",
    description: "A clean and refined hard box crafted with premium materials for a warm, elegant presentation.",
    image: "/images/hampers/hardBox.jpg",
    boxSizes: [{ ...boxSizes[2], price: 70000 }],
    defaultItems: [],
  },
];

export const itemCatalog: HamperItem[] = [
  { id: "teddyBear", name: "Small Teddy Bear (15cm)", price: 15000 },
  { id: "flower", name: "Small Rose Bouquet", price: 18000 },
  { id: "rocher", name: "Ferrero Rocher", price: 50000 },
  { id: "choc", name: "Chocolate Bar", price: 20000 },
  { id: "lamps", name: "LED Lights", price: 5000 },
];

export const packagingOptions: PackagingOption[] = [
  { id: "blush", name: "Blush & Cream", color: "#F2DDE1", ribbon: "#E7C4C4" },
  { id: "sage", name: "Sage & Dove", color: "#DCE6DF", ribbon: "#BFD0C4" },
  { id: "navy", name: "Navy & Sand", color: "#D9DEE6", ribbon: "#5D768B" },
  { id: "champagne", name: "Champagne", color: "#EFE4D3", ribbon: "#E3C9A4" },
];

export const lidPersonalizationOptions: LidPersonalizationOption[] = [
  {
    id: "two-photos-short",
    title: "2 Polaroid Photos + Short Message",
    description: "Includes two mini polaroids and a short sentiment engraved on the lid.",
    photoCount: 2,
    minWords: 8,
    maxWords: 15,
  },
  {
    id: "one-photo-long",
    title: "1 Polaroid Photo + Long Message",
    description: "One featured photo with space for a heartfelt note.",
    photoCount: 1,
    minWords: 25,
    maxWords: 40,
  },
  {
    id: "message-only",
    title: "Message Only",
    description: "All typography on the lid (no photos), just words that shine.",
    photoCount: 0,
    minWords: 40,
    maxWords: 60,
  },
];