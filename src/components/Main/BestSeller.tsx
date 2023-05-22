import styled, { keyframes } from "styled-components";
import img1 from "../../dummy/img/1.jpg";
import img2 from "../../dummy/img/2.jpg";
import img3 from "../../dummy/img/3.jpg";
import img4 from "../../dummy/img/4.jpg";
import img5 from "../../dummy/img/5.gif";
import { Divider } from "@mui/material";

const BestSellerSection = styled.div`
  display: block;
`;
const BestSellerTextArea = styled.div`
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  padding: 50px 0 5px;
`;
const BestSellerText = styled.h2`
  font-weight: 400;
  color: #2b64f3;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
`;
const ProductArea = styled.div`
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
const changeColor = keyframes`
   0% {
    color: #00ff7f;
  }
  33% {
    color: #cd5c5c;
  }
  66% {
    color: #6495ed;
  }
  100% {
    color: red;
  }
  
`;

const AnimatedText = styled.span`
  animation: ${changeColor} 1s infinite;
`;
const BestSeller = () => {
  return (
    <>
      <BestSellerSection>
        <BestSellerTextArea>
          <BestSellerText>
            <AnimatedText>BEST SELLER</AnimatedText>
          </BestSellerText>
        </BestSellerTextArea>

        <ProductArea>
          <ProductGrid>
            <Product>
              <img src={img1} width="100%" />
              <span>타이틀 영역</span>
              <Divider variant="middle" flexItem sx={{ marginY: "12px" }} />
            </Product>
            <Product>
              <img src={img2} width="100%" />
              <span>타이틀 영역</span>
              <Divider variant="middle" flexItem sx={{ marginY: "12px" }} />
            </Product>
            <Product>
              <img src={img3} width="100%" />
              <span>타이틀 영역</span>
              <Divider variant="middle" flexItem sx={{ marginY: "12px" }} />
            </Product>
            <Product>
              <img src={img4} width="100%" />
              <span>타이틀 영역</span>
              <Divider variant="middle" flexItem sx={{ marginY: "12px" }} />
            </Product>
            <Product>
              <img src={img5} width="100%" />
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
