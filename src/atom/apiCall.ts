import axios, { AxiosResponse } from "axios";

const accessToken = localStorage.getItem("accessToken") as string;
const refreshToken = localStorage.getItem("refreshToken") as string;

export const api = axios.create({
  baseURL: "http://43.201.170.8:8000/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
  timeout: 10000,
});

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post<AuthResponse>("/user/reissue", {
          headers: {
            RefreshToken: `Bearer ${refreshToken}`,
          },
        });

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (e) {
        /* empty */
      }
    }

    return Promise.reject(error);
  }
);
