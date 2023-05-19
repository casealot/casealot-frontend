import BestSeller from "../components/Main/BestSeller";
import Product from "../components/Main/Product";
import ProductFilter from "../components/Main/ProductFilter";
import Nav from "../components/Nav/Nav";

const MainPage = () => {
  return (
    <>
      <Nav />
      <BestSeller />
      <ProductFilter />
      <Product />
    </>
  );
};

export default MainPage;
