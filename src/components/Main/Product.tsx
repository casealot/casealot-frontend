import { Divider } from "@mui/material";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { ProductListAtom, ProductType } from "../../atom/Product";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../atom/apiCall";
import { Container } from "@mui/joy";
import ready from "../../dummy/img/imgready.gif";

// const ProductArea = styled.div`
//   margin: 70px 0 0;
//   padding: 30px 0 40px;
//   display: flex;
//   justify-content: center;
// `;

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

const Product = () => {
  const [page, setPage] = useState(0);
  const getProduct = async () => {
    const response = await api.post("/cal/v1/product", {
      filter: [],
      page: page,
      query: "",
      size: 12,
      sort: [{ field: "price", option: "desc" }],
    });
    console.log(response.data.body.product.items);
    return {
      data: response.data.body.product.items, // Assuming the array of products is in the `data` property of the response
    };
  };

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

  const handlePageChange = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    getProduct();
  }, [page]);

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
                  {item.thumbnail && item.thumbnail.url ? (
                    <img
                      src={item.thumbnail.url}
                      style={{
                        maxWidth: "250px",
                        width: "100%",
                        maxHeight: "250px",
                        minHeight: "250px",
                      }}
                      alt={item.name}
                    />
                  ) : (
                    <img
                      src={ready}
                      style={{
                        width: "100%",
                        maxHeight: "250px",
                        maxWidth: "250px",
                      }}
                    />
                  )}
                </StyledLink>
                <StyledLink to={`/products/${item.id}`}>
                  <span
                    style={{
                      marginTop: "20px",
                      textAlign: "left",
                      whiteSpace: "nowrap",
                      maxWidth: "200px",
                    }}
                  >
                    {item.name}
                  </span>
                </StyledLink>
                <Divider variant="middle" flexItem sx={{ marginY: "12px" }} />
                <StyledLink to={`/products/${item.id}`}>
                  <span>{item.price}원</span>
                </StyledLink>
              </ProductList>
            ))}
          </ProductGrid>
        )}
      </Container>

      <button onClick={handlePageChange}>page</button>
    </>
  );
};

export default Product;
