import { atom } from "recoil";

export interface cartItems {
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
}
export const CartListState = atom<cartItems[]>({
  key: "CartListState",
  default: [],
});

export const ConfirmButtonState = atom<number | null>({
  key: "ConfirmButtonState",
  default: null,
});
