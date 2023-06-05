import { Divider } from "@mui/material";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { ProductListAtom, ProductType } from "../../atom/Product";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../atom/apiCall";
import { Container } from "@mui/joy";

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
  width: 25%;
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
  const response = await api.post("/cal/v1/product", {
    filter: [] as any,
    page: 0,
    query: "",
    size: 12,
    sort: [],
  });
  console.log(response.data.body.product.items);
  return {
    data: response.data.body.product.items, // Assuming the array of products is in the `data` property of the response
  };
};

const Product = () => {
  const [productList, setProductList] =
    useRecoilState<ProductType[]>(ProductListAtom);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery(["products"], getProduct, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isLoading && products) {
      setProductList(products.data);
    }
  }, [isLoading, products, setProductList]);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching products");
    }
  }, [isError]);

  return (
    <>
      <Container maxWidth="xl">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ProductGrid>
            {productList.map((item: ProductType) => (
              <ProductList key={item.id}>
                <StyledLink to={`/products/${item.id}`}>
                  <img
                    src={item.thumbnail.url}
                    style={{
                      maxHeight: 300,
                      maxWidth: 300,
                      minWidth: 300,
                    }}
                    alt={item.name}
                  />
                </StyledLink>
                <StyledLink to={`/products/${item.id}`}>
                  <span
                    style={{
                      marginTop: "20px",
                      textAlign: "left",
                      marginLeft: "15px",
                      whiteSpace: "nowrap",
                      maxWidth: "200px",
                    }}
                  >
                    {item.name}
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
      </Container>
    </>
  );
};

export default Product;
