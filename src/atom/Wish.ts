import { atom, selector } from "recoil";
import { api } from "./apiCall";
import { accessTokenState } from "./User";

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

export const getWish = async () => {
  const response = await api.get("cal/v1/wishlist");
  return response.data.body.wishlist.productList;
};

export const wishListState = atom<WishType[]>({
  key: "wishListState",
  default: [],
});
