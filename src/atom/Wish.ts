import { atom, selector } from "recoil";
import { api } from "./apiCall";

export interface WishType {
  color: string;
  content: string;
  id: number;
  name: string;
  price: number;
  season: string;
  thumbnail: string;
  type: string;
}
const accessToken = localStorage.getItem("accessToken");

const getWish = async () => {
  const response = await api.get("cal/v1/wishlist");
  return response.data.body.wishlist;
};

export const WishList = selector<WishType[]>({
  key: "WishList",
  get: async ({ get }) => {
    // Use get() to access other Recoil state/selector values if needed

    if (accessToken) {
      const WishItem = await getWish();
      return WishItem;
    } else {
      return [];
    }
  },
});

export const wishListState = atom<WishType[]>({
  key: "wishListState",
  default: WishList,
});
