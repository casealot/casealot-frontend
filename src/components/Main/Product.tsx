import { Divider } from "@mui/material";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { ProductListAtom, fakeProduct } from "../../atom/Product";
import { useEffect } from "react";

import { Link } from "react-router-dom";
const ProductArea = styled.div`
  margin: 70px 0 0;
  padding: 30px 0 40px;
  display: flex;
  justify-content: center;
`;
const ProductGrid = styled.ul`
  padding: 10px 0 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  color: #000;
`;
const ProductList = styled.li`
  position: relative;
  vertical-align: top;
  margin: 0 5px 30px !important;
  margin-left: 10px;
  text-align: center;
  width: 20%;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const getProduct = async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
};
const Product = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery(["products"], getProduct);
  const [productList, setProductList] = useRecoilState(ProductListAtom);

  useEffect(() => {
    if (!isLoading && products) {
      setProductList(products);
    }
  }, [isLoading, products, setProductList]);

  useEffect(() => {
    if (isError) {
      console.error("error");
    }
  }, [isError]);

  return (
    <>
      <ProductArea>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ProductGrid>
            {productList.map((item: fakeProduct) => (
              <ProductList key={item.id}>
                <img
                  src={item.image}
                  width="100%"
                  height="100%"
                  style={{ maxHeight: 300, maxWidth: 300 }}
                />
                <span
                  style={{
                    marginTop: "20px",
                    textAlign: "left",
                    marginLeft: "15px",
                    // Add this line
                    whiteSpace: "nowrap",
                    maxWidth: "200px",
                  }}
                >
                  {item.title}
                </span>
                <Divider variant="middle" flexItem sx={{ marginY: "12px" }} />
                <span>{item.price}$</span>
              </ProductList>
            ))}
          </ProductGrid>
        )}
        {/* <ProductList>
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
          </ProductList> */}
      </ProductArea>
      <ProductArea>
        {/* <ProductGrid>
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
        </ProductGrid> */}
      </ProductArea>
    </>
  );
};

export default Product;
