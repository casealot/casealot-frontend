import axios from "axios";

export interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

const accessToken = localStorage.getItem("accessToken");

export const api = axios.create({
  baseURL: "http://43.201.170.8:8000/",
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

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const res = await axios.get(
          "http://43.201.170.8:8000/cal/v1/auth/refresh",
          {
            headers: {
              RefreshToken: `Bearer ${refreshToken}`,
            },
          }
        );

        const newAccessToken = res.data.body.accessToken;
        const newRefreshToken = res.data.body.refreshToken;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axios(originalRequest);
      } catch (e) {
        // 에러 처리
      }
    }

    return Promise.reject(error);
  }
);
