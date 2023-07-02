import { Divider } from "@mui/material";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { ProductListAtom, ProductType } from "../../atom/Product";
import { useEffect, useState } from "react";

import { api } from "../../atom/apiCall";
import { Container } from "@mui/material";
import ready from "../../dummy/img/imgready.gif";
import { NoneStyledLink } from "../Useable/Link";
import Loading from "../Useable/Loading";

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
  gap: 30px;
  color: #000;
`;

const ProductList = styled.li`
  position: relative;
  vertical-align: top;
  margin: 0 5px 30px !important;
  margin-left: 10px;
  text-align: center;
  width: 16%;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 1280px) {
    width: 33.33%;
  }

  @media (max-width: 960px) {
    width: 50%;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Product = () => {
  const [page] = useState(0);
  const getProduct = async () => {
    const response = await api.post("/cal/v1/product", {
      filter: [],
      page: page,
      query: "",
      size: 15,
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

  // const handlePageChange = () => {
  //   setPage(page + 1);
  // };

  useEffect(() => {
    getProduct();
  }, [page]);

  return (
    <>
      <Container maxWidth="xl">
        {isLoading ? (
          <Loading />
        ) : (
          <ProductGrid>
            {productList.map((item: ProductType) => (
              <ProductList key={item.id}>
                <NoneStyledLink to={`/products/${item.id}`}>
                  <div
                    style={{
                      maxWidth: 300,
                      maxHeight: 300,
                    }}
                  >
                    {item.thumbnail && item.thumbnail.url ? (
                      <img
                        src={item.thumbnail.url}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          aspectRatio: "1/1",
                        }}
                        alt={item.name}
                      />
                    ) : (
                      <img
                        src={ready}
                        style={{
                          width: "100%",
                        }}
                      />
                    )}
                  </div>
                </NoneStyledLink>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "20px",
                  }}
                >
                  <NoneStyledLink to={`/products/${item.id}`}>
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
                  </NoneStyledLink>
                  <Divider variant="middle" flexItem sx={{ marginY: "12px" }} />
                  <NoneStyledLink to={`/products/${item.id}`}>
                    <span>{item.price}원</span>
                  </NoneStyledLink>
                </div>
              </ProductList>
            ))}
          </ProductGrid>
        )}
      </Container>
    </>
  );
};

export default Product;
