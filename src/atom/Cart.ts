import { atom } from "recoil";
import { fakeProduct } from "./Product";

export const CartListState = atom<fakeProduct[]>({
  key: "CartListState",
  default: [],
});
