import { atom } from "recoil";

export interface ProductType {
  createdDt: string;
  modifiedDt: string;
  id: number;
  name: string;
  content: string;
  thumbnail: {
    createdDt: string;
    modifiedDt: string;
    uuid: string;
    name: string;
    fileType: string;
    url: string;
    fileSize: number;
  };
  images: [
    {
      createdDt: string;
      modifiedDt: string;
      uuid: string;
      name: string;
      fileType: string;
      url: string;
      fileSize: number;
    }
  ];
  price: number;
  sale: number;
  views: number;
  sells: number;
  color: string;
  season: string;
  type: string;
  calculatePrice: number;
}

export const ProductListAtom = atom<ProductType[]>({
  key: "ProductListAtom",
  default: [],
});

export interface Review {
  id: number;
  rating: number | null;
  comment: string;
}

export const ReviewListAtom = atom<Review[]>({
  key: "reviewList",
  default: [],
});
