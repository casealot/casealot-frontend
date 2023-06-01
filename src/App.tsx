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

function App() {
  return (
    <>
      <BrowserRouter>
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
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
