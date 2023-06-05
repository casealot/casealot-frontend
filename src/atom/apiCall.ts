import axios, { AxiosResponse } from "axios";
import { useCookies } from "react-cookie";

const accessToken = localStorage.getItem("accessToken");

export const api = axios.create({
  baseURL: "http://43.201.170.8:8000/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
  timeout: 10000,
});

// interface AuthResponse {
//   accessToken: string;
//   refreshToken: string;
// }

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;
    const [cookies, setCookies] = useCookies(["refreshToken"]);
    const refreshToken = cookies.refreshToken;
    const accessToken = localStorage.getItem("accessToken");

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/cal/v1/auth/refresh", {
          headers: {
            RefreshToken: `Bearer ${refreshToken}`,
          },
        });

        localStorage.setItem(
          "accessToken",
          res.data.body.customerToken.accessToken
        );
        setCookies(
          "refreshToken",
          `${res.data.body.customerToken.refreshToken}`,
          {
            path: "/",
          }
        );

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
