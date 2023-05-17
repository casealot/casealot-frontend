import styled from "styled-components";
import img1 from "../../dummy/img/1.jpg";
import { Divider } from "@mui/material";
import Grid from "@mui/material/Grid";

const BestSellerSection = styled.div`
  display: block;
`;
const BestSellerTextArea = styled.div`
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  padding: 110px 0 5px;
`;
const BestSellerText = styled.h2`
  font-weight: 400;
  color: #000;
`;
const ProductArea = styled.div`
  margin: 70px 0 0;
  padding: 30px 0 40px;
  display: flex;
  justify-content: center;
`;
const ProductGrid = styled.ul`
  padding: 10px 0 0;
  display: flex;
  margin-right: 6px;
  color: #000;
`;
const Product = styled.li`
  position: relative;
  vertical-align: top;
  margin: 0 5 30px !important;
  margin-left: 10px;
  width: 20%;
  text-align: center;
`;
const BestSeller = () => {
  return (
    <>
      <BestSellerSection>
        <BestSellerTextArea>
          <BestSellerText>BEST SELLER</BestSellerText>
        </BestSellerTextArea>
        <ProductArea>
          <ProductGrid>
            <Product>
              <img src={img1} width="100%" />
              <span>타이틀 영역</span>
              <Divider variant="middle" flexItem sx={{ marginY: "12px" }} />
            </Product>
            <Product>
              <img src={img1} width="100%" />
              <span>타이틀 영역</span>
              <Divider variant="middle" flexItem sx={{ marginY: "12px" }} />
            </Product>
            <Product>
              <img src={img1} width="100%" />
              <span>타이틀 영역</span>
              <Divider variant="middle" flexItem sx={{ marginY: "12px" }} />
            </Product>
            <Product>
              <img src={img1} width="100%" />
              <span>타이틀 영역</span>
              <Divider variant="middle" flexItem sx={{ marginY: "12px" }} />
            </Product>
            <Product>
              <img src={img1} width="100%" />
              <span>타이틀 영역</span>
              <Divider variant="middle" flexItem sx={{ marginY: "12px" }} />
            </Product>
          </ProductGrid>
        </ProductArea>
      </BestSellerSection>
    </>
  );
};

export default BestSeller;
