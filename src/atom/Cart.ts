import { atom } from "recoil";

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

export const ConfirmButtonState = atom<number | null>({
  key: "ConfirmButtonState",
  default: null,
});
