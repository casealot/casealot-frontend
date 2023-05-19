import BestSeller from "../components/Main/BestSeller";
import ImgCarousel from "../components/Main/ImgCarousel";
import Product from "../components/Main/Product";
import ProductFilter from "../components/Main/ProductFilter";
import Nav from "../components/Nav/Nav";
import styled from "styled-components";

const MainWrapper = styled.div`
  width: 100%;
`;
const MainPage = () => {
  return (
    <>
      <MainWrapper>
        <Nav />
        <ImgCarousel />
        <BestSeller />
        <ProductFilter />
        <Product />
      </MainWrapper>
    </>
  );
};

export default MainPage;
