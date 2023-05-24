import { atom } from "recoil";
import { fakeProduct } from "./Product";

export interface cartItems {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  quantity: number;
}
export const CartListState = atom<cartItems[]>({
  key: "CartListState",
  default: [],
});

export const ConfirmButton = atom<number | null>({
  key: "ConfirmButtonState",
  default: null,
});
