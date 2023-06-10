import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import SigninPage from "./pages/SigninPage";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import SignUpPage from "./pages/SignupPage";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import Mypage from "./pages/Mypage";
import EditProfile from "./pages/EditProfilePage";
import QnaPage from "./pages/QnAPage";
import AdminLogin from "./pages/AdminLogin";
import QNAPost from "./pages/QNAPost";
import ProductRegistrationPage from "./pages/ProductRegistPage";
import ProductState from "./components/Admin/ProductState";
import ProductFix from "./components/Admin/ProductFix";
import WishListPage from "./pages/WishListPage";
import "./atom/Recoilenv";
import { Refresh, api } from "./atom/apiCall";
import { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
const role = localStorage.getItem("role");

function App() {
  const [cookies, setCookie] = useCookies(["refreshToken"]);

  useEffect(() => {
    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = cookies.refreshToken;

            const res = await axios.get(
              "http://43.201.170.8:8000/cal/v1/auth/refresh",
              {
                headers: {
                  RefreshToken: `Bearer ${refreshToken}`,
                },
              }
            );

            const newAccessToken = res.data.body.token;
            const newRefreshToken = res.data.refreshToken;

            localStorage.setItem("accessToken", newAccessToken);
            setCookie("refreshToken", newRefreshToken, { path: "/" });

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return axios(originalRequest);
          } catch (e) {
            // 에러 처리
          }
        }

        return Promise.reject(error);
      }
    );

    // 나머지 앱 컴포넌트의 내용
  }, [cookies.refreshToken, setCookie]);
  return (
    <>
      <BrowserRouter basename="/">
        <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypage/profile" element={<EditProfile />} />
          <Route path="/qna" element={<QnaPage />} />
          <Route path="/admin/signin" element={<AdminLogin />} />
          <Route path="/qna/new" element={<QNAPost />} />
          {/* <Route element={<ProductRegistrationPage />} />/ */}
          <Route
            path="/admin/addproduct"
            element={
              role === "ADMIN" ? (
                <ProductRegistrationPage />
              ) : (
                <h1>No access</h1>
              )
            }
          />
          <Route path="/wishlist" element={<WishListPage />} />
          <Route
            path="/admin/product"
            element={role === "ADMIN" ? <ProductState /> : <h1>No access</h1>}
          />
          <Route
            path="/admin/edit/:id"
            element={role === "ADMIN" ? <ProductFix /> : <h1>No access</h1>}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
