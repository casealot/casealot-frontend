import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import SigninPage from "./pages/User/SigninPage";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import SignUpPage from "./pages/User/SignupPage";
import ProductDetail from "./pages/Product/ProductDetail";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/Product/ProductPage";
import Mypage from "./pages/User/Mypage";
import EditProfile from "./pages/User/EditProfilePage";
import QnaPage from "./pages/QnA/QnAPage";
import AdminLogin from "./pages/Admin/AdminLogin";
import QNAPost from "./pages/QnA/QNAPost";
import ProductRegistrationPage from "./pages/Product/ProductRegistPage";
import ProductState from "./components/Admin/ProductState";
import ProductFix from "./components/Admin/ProductFix";
import WishListPage from "./pages/WishListPage";
import "./atom/Recoilenv";
import QnaDetail from "./pages/QnA/QnaDetail";
import QnAFix from "./pages/QnA/QnAFix";
import AdminInfo from "./pages/Admin/AdminInfo";
import OrderList from "./pages/User/OrderList";
import OrderDetail from "./pages/User/OrderDetail";

const role = localStorage.getItem("role");

function App() {
  return (
    <BrowserRouter>
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
        <Route path="/mypage/orderlist" element={<OrderList />} />
        <Route path="/mypage/order/:id" element={<OrderDetail />} />
        <Route path="/qna" element={<QnaPage />} />
        <Route path="/qna/new" element={<QNAPost />} />
        <Route path="/qna/:id" element={<QnaDetail />} />
        <Route path="/qna/fix/:id" element={<QnAFix />} />
        {/* <Route element={<ProductRegistrationPage />} />/ */}
        <Route
          path="/admin"
          element={role === "ADMIN" ? <AdminInfo /> : <h1>No access</h1>}
        />
        <Route
          path="/admin/addproduct"
          element={
            role === "ADMIN" ? <ProductRegistrationPage /> : <h1>No access</h1>
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
  );
}

export default App;
