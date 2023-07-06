import axios from "axios";
import { useNavigate } from "react-router-dom";

export const api = axios.create({
  baseURL: "https://casealot.shop",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const refreshToken = localStorage.getItem("refreshToken");

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.get("/cal/v1/auth/refresh", {
          headers: {
            RefreshToken: `Bearer ${refreshToken}`,
          },
        });

        const newAccessToken = res.data.body.accessToken;
        const newRefreshToken = res.data.body.refreshToken;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        location.reload();
        return axios(originalRequest);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
        }
      }
    }

    return Promise.reject(error);
  }
);
