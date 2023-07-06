import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  accessTokenState,
  refreshTokenState,
  isLoggedInSelector,
} from "./User";

export const api = axios.create({
  // baseURL: "http://43.201.170.8:8000/",
  baseURL: "https://casealot.shop",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const accessToken = useRecoilValue(accessTokenState);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const navigate = useNavigate();
    const isLoggedIn = useRecoilValue(isLoggedInSelector);
    const setAccessToken = useSetRecoilState(accessTokenState);
    const setRefreshToken = useSetRecoilState(refreshTokenState);

    if (
      isLoggedIn &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = useRecoilValue(refreshTokenState);

        const res = await api.get("/cal/v1/auth/refresh", {
          headers: {
            RefreshToken: `Bearer ${refreshToken}`,
          },
        });

        const newAccessToken = res.data.body.accessToken;
        const newRefreshToken = res.data.body.refreshToken;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // Update Recoil state with new tokens
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        location.reload();
        return axios(originalRequest);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          navigate("/");
        }
      }
    }

    return Promise.reject(error);
  }
);
