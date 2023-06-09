import { atom } from "recoil";
import { api } from "./apiCall";

export interface cartItems {
  id: number;
  name: string;
  price: number;
  quantity: number;
  thumbnail: string;
  content: string;
  color: string;
  season: string;
  type: string;
}

const getCart = async () => {
  const response = await api.get(`cal/v1/cart`);
  console.log(response.data.body);
  return response.data.body.cart.products;
};
export const CartListState = atom<cartItems[]>({
  key: "CartListState",
  default: getCart(),
});

export const ConfirmButtonState = atom<number | null>({
  key: "ConfirmButtonState",
  default: null,
});
