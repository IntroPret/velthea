export type HamperItem = { id: string; name: string; price: number };

export type BoxSize = {
  id: string;
  name: string;
  length: number;
  width: number;
  height: number;
  price: number;
  itemLimit: number;
};

export type LidPersonalizationOption = {
  id: string;
  title: string;
  description: string;
  photoCount: number;
  minWords: number;
  maxWords: number;
};

export type Hamper = {
  id: string;
  name: string;
  description: string;
  image: string;
  boxSizes: BoxSize[];
  defaultItems: HamperItem[];
};

export type PackagingOption = {
  id: string;
  name: string;
  color: string;
  ribbon: string;
};