export type HamperItem = { id: string; name: string; price: number };
export type Hamper = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  defaultItems: HamperItem[];
};

export type PackagingOption = {
  id: string;
  name: string;
  color: string;
  ribbon: string;
};