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
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const getProduct = async () => {
  const response = await axios.get(
    "http://ec2-15-164-214-39.ap-northeast-2.compute.amazonaws.com:8000/cal/v1/product"
  );
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
                <StyledLink to={`/products/${item.id}`}>
                  <img
                    src={item.image}
                    style={{
                      maxHeight: 300,
                      maxWidth: 300,
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </StyledLink>
                <StyledLink to={`/products/${item.id}`}>
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
                </StyledLink>
                <Divider variant="middle" flexItem sx={{ marginY: "12px" }} />
                <StyledLink to={`/products/${item.id}`}>
                  <span>{item.price}$</span>
                </StyledLink>
              </ProductList>
            ))}
          </ProductGrid>
        )}
      </ProductArea>
      <ProductArea></ProductArea>
    </>
  );
};

export default Product;
