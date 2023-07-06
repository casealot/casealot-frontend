import { atom, selector } from "recoil";
import { api } from "./apiCall";
import { isLoggedInSelector } from "./User";

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

export const getCart = async () => {
  const response = await api.get(`cal/v1/cart`);
  console.log(response.data.body);
  return response.data.body.cart.products;
};

export const CartList = selector<cartItems[]>({
  key: "CartList",
  get: async ({ get }) => {
    const isLoggedIn = get(isLoggedInSelector);
    console.log("isLoggedIn", isLoggedIn);
    if (isLoggedIn) {
      const cartItems = await getCart();
      return cartItems;
    } else {
      console.log("안돼");
      return [];
    }
  },
});

export const CartListState = atom<cartItems[]>({
  key: "CartListState",
  default: selector<cartItems[]>({
    key: "CartListDefault",
    get: async ({ get }) => {
      const isLoggedIn = get(isLoggedInSelector);
      console.log("isLoggedIn", isLoggedIn);
      if (isLoggedIn) {
        const cartItems = await getCart();
        if (cartItems.length < 1) {
          return [];
        }
        return cartItems;
      } else {
        console.log("안됌");
        return [];
      }
    },
  }),
});

export const ConfirmButtonState = atom<number | null>({
  key: "ConfirmButtonState",
  default: null,
});
