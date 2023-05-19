import { Divider } from "@mui/material";
import styled from "styled-components";
import img1 from "../../dummy/img/1.jpg";
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
const ProductList = styled.li`
  position: relative;
  vertical-align: top;
  margin: 0 5 30px !important;
  margin-left: 10px;
  width: 20%;
  text-align: center;
`;

const Product = () => {
  return (
    <>
      <ProductArea>
        <ProductGrid>
          <ProductList>
            <img src={img1} width="100%" />
            <span>타이틀 영역</span>
            <Divider variant="middle" flexItem sx={{ marginY: "12px" }} />
          </ProductList>
          <ProductList>
            <img src={img1} width="100%" />
            <span>타이틀 영역</span>
            <Divider variant="middle" flexItem sx={{ marginY: "12px" }} />
          </ProductList>
          <ProductList>
            <img src={img1} width="100%" />
            <span>타이틀 영역</span>
            <Divider variant="middle" flexItem sx={{ marginY: "12px" }} />
          </ProductList>
          <ProductList>
            <img src={img1} width="100%" />
            <span>타이틀 영역</span>
            <Divider variant="middle" flexItem sx={{ marginY: "12px" }} />
          </ProductList>
          <ProductList>
            <img src={img1} width="100%" />
            <span>타이틀 영역</span>
            <Divider variant="middle" flexItem sx={{ marginY: "12px" }} />
          </ProductList>
        </ProductGrid>
      </ProductArea>
      <ProductArea>
        <ProductGrid>
          <ProductList>
            <img src={img1} width="100%" />
            <span>타이틀 영역</span>
            <Divider variant="middle" flexItem sx={{ marginY: "12px" }} />
          </ProductList>
          <ProductList>
            <img src={img1} width="100%" />
            <span>타이틀 영역</span>
            <Divider variant="middle" flexItem sx={{ marginY: "12px" }} />
          </ProductList>
          <ProductList>
            <img src={img1} width="100%" />
            <span>타이틀 영역</span>
            <Divider variant="middle" flexItem sx={{ marginY: "12px" }} />
          </ProductList>
          <ProductList>
            <img src={img1} width="100%" />
            <span>타이틀 영역</span>
            <Divider variant="middle" flexItem sx={{ marginY: "12px" }} />
          </ProductList>
          <ProductList>
            <img src={img1} width="100%" />
            <span>타이틀 영역</span>
            <Divider variant="middle" flexItem sx={{ marginY: "12px" }} />
          </ProductList>
        </ProductGrid>
      </ProductArea>
    </>
  );
};

export default Product;
