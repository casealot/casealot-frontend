import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

export const api = axios.create({
  baseURL: "http://43.201.170.8:8000/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
  timeout: 10000,
});
