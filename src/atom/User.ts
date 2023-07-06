import { atom, selector } from "recoil";

export const accessTokenState = atom({
  key: "accessTokenState",
  default: localStorage.getItem("accessToken"),
});

export const refreshTokenState = atom({
  key: "refreshTokenState",
  default: localStorage.getItem("refreshToken") || "",
});

export const isLoggedInSelector = selector({
  key: "isLoggedInSelector",
  get: ({ get }) => {
    const accessToken = get(accessTokenState);
    return !!accessToken;
  },
});
