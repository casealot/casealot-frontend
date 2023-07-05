import axios from "axios";
import { useNavigate } from "react-router-dom";
const accessToken = localStorage.getItem("accessToken");

export const api = axios.create({
  // baseURL: "http://43.201.170.8:8000/",
  baseURL: "https://casealot.shop",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const token = localStorage.getItem("accessToken");
    if (token && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

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
          const navigate = useNavigate();
          navigate("/");
        }
      }
    }

    return Promise.reject(error);
  }
);
