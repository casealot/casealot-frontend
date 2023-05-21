import BestSeller from "../components/Main/BestSeller";
import ImgCarousel from "../components/Main/ImgCarousel";
import Product from "../components/Main/Product";
import ProductFilter from "../components/Main/ProductFilter";

import styled from "styled-components";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const MainPage = () => {
  return (
    <>
      <MainWrapper>
        <ImgCarousel />
        <BestSeller />
        <ProductFilter />
        <Product />
      </MainWrapper>
    </>
  );
};

export default MainPage;
