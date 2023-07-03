import BestSeller from "../components/Main/BestSeller";
// import ImgCarousel from "../components/Main/ImgCarousel";
import Product from "../components/Main/Product";
// import ProductFilter from "../components/Main/ProductFilter";

// const MainWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
// `;
const MainPage = () => {
  return (
    <>
      {/* <MainWrapper> */}
      <Product />
      {/* <ImgCarousel /> */}
      <BestSeller />
      {/* <ProductFilter /> */}

      {/* </MainWrapper> */}
    </>
  );
};

export default MainPage;
