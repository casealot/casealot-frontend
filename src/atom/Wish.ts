import { atom } from "recoil";
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
const getWish = async () => {
  const response = await api.get("cal/v1/wishlist");
  return response.data.body.wishlist;
};
export const wishListState = atom<WishType[]>({
  key: "wishListState",
  default: getWish(),
});
