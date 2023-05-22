import { atom } from "recoil";

export interface fakeProduct {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export const ProductListAtom = atom<fakeProduct[]>({
  key: "ProductListAtom",
  default: [],
});
