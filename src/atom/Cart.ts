import { atom, selector } from "recoil";
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

const accessToken = localStorage.getItem("accessToken");

const getCart = async () => {
  const response = await api.get(`cal/v1/cart`);
  console.log(response.data.body);
  return response.data.body.cart.products;
};

export const CartList = selector<cartItems[]>({
  key: "CartList",
  get: async ({ get }) => {
    if (accessToken) {
      const cartItems = await getCart();
      return cartItems;
    } else {
      return [];
    }
  },
});

export const CartListState = atom({
  key: "CartListState",
  default: CartList,
});

export const ConfirmButtonState = atom<number | null>({
  key: "ConfirmButtonState",
  default: null,
});
