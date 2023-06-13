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
import QnaDetail from "./pages/QnaDetail";
import QnAFix from "./pages/QnAFix";

const role = localStorage.getItem("role");

function App() {
  // 나머지 앱 컴포넌트의 내용

  return (
    <>
      <BrowserRouter basename="/">
        <Nav />
        <Routes>
          <Route
            path="/admin/signin"
            element={role ? <div>No Access</div> : <AdminLogin />}
          />

          <Route path="/" element={<MainPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypage/profile" element={<EditProfile />} />
          <Route path="/qna" element={<QnaPage />} />
          <Route path="/qna/new" element={<QNAPost />} />
          <Route path="/qna/:id" element={<QnaDetail />} />
          <Route path="/qna/fix/:id" element={<QnAFix />} />
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
