import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import SigninPage from "./pages/SigninPage";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import SignUpPage from "./pages/SignupPage";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
