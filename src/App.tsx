import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import SigninPage from "./pages/User/SigninPage";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import SignUpPage from "./pages/User/SignupPage";
import ProductDetail from "./pages/Product/ProductDetail";
import CartPage from "./pages/User/CartPage";
// import ProductPage from "./pages/Product/ProductPage";
import Mypage from "./pages/User/Mypage";
import EditProfile from "./pages/User/EditProfilePage";
import QnaPage from "./pages/QnA/QnAPage";
import AdminLogin from "./pages/Admin/AdminLogin";
import QNAPost from "./pages/QnA/QNAPost";
import ProductRegistrationPage from "./pages/Product/ProductRegistPage";
import ProductState from "./components/Admin/ProductState";
import ProductFix from "./components/Admin/ProductFix";
import WishListPage from "./pages/User/WishListPage";
import "./atom/Recoilenv";
import QnaDetail from "./pages/QnA/QnaDetail";
import QnAFix from "./pages/QnA/QnAFix";
import AdminInfo from "./pages/Admin/AdminInfo";
import OrderList from "./pages/User/OrderList";
import OrderDetail from "./pages/User/OrderDetail";
import CategoryPage from "./pages/Product/CategoryPage";
import TokenHandler from "./pages/User/KakaoRedirect";
import AdminOrderList from "./pages/Admin/AdminOrderList";
import SearchPage from "./pages/SearchPage";
import AdminQnaList from "./pages/Admin/AdminQnaList";
import TopScroll from "./components/Useable/TopScroll";
import Instagram from "./components/Useable/Instagram";
import NoticePage from "./pages/Notice/NoticePage";
import NoticeDetail from "./pages/Notice/NoticeDetail";
import NoticePost from "./pages/Notice/NoticePost";

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
        <Route path="/oauth/redirect" element={<TokenHandler />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        {/* <Route path="/products/" element={<ProductPage />} /> */}
        <Route path="/products/category/:category" element={<CategoryPage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/profile" element={<EditProfile />} />
        <Route path="/mypage/orderlist" element={<OrderList />} />
        <Route path="/mypage/order/:id" element={<OrderDetail />} />
        <Route path="/qna" element={<QnaPage />} />
        <Route path="/qna/new" element={<QNAPost />} />
        <Route path="/qna/:id" element={<QnaDetail />} />
        <Route path="/qna/fix/:id" element={<QnAFix />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/notice/:id" element={<NoticeDetail />} />

        <Route path="/search/:keyword" element={<SearchPage />} />
        <Route path="/wishlist" element={<WishListPage />} />
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
        <Route
          path="/admin/qna"
          element={role === "ADMIN" ? <AdminQnaList /> : <h1>NO access</h1>}
        />
        <Route
          path="/notice/new"
          element={role === "ADMIN" ? <NoticePost /> : <h1>NO access</h1>}
        />
        <Route
          path="/admin/product"
          element={role === "ADMIN" ? <ProductState /> : <h1>No access</h1>}
        />
        <Route
          path="/admin/edit/:id"
          element={role === "ADMIN" ? <ProductFix /> : <h1>No access</h1>}
        />
        <Route
          path="/admin/order"
          element={role === "ADMIN" ? <AdminOrderList /> : <h1>No access</h1>}
        />
      </Routes>

      <Footer />

      <TopScroll />
      <Instagram />
    </BrowserRouter>
  );
}

export default App;
