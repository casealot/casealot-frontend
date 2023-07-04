import { atom } from "recoil";

export const accessTokenState = atom({
  key: "accessTokenState",
  default: localStorage.getItem("accessToken"),
});

export const redirectURI =
  "https://casealot.netlify.app/oauth/redirect?token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNzk5NjUzNTE2Iiwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MTY4ODQ5MzA2M30.OMSvlYckNjHZCOPGP8g5_i_X7txGmVIiCi1gvRpP1Ns&refreshToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5MjZEOTZDOTAwMzBERDU4NDI5RDI3NTFBQzFCREJCQyIsImV4cCI6MTY4OTA5NjA2M30.zo5RMiu9e9OgLh3rCCYQ_r8tSQw0tzfAwTDehwRgYqM";
