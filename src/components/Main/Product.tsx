import { Divider, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { ProductListAtom, ProductType } from "../../atom/Product";
import { useEffect, useState } from "react";

import { api } from "../../atom/apiCall";
import { Container } from "@mui/material";
import ready from "../../dummy/img/imgready.gif";
import { NoneStyledLink } from "../Useable/Link";
import Loading from "../Useable/Loading";

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
          <Grid container spacing={2} gap={3} sx={{ justifyContent: "center" }}>
            {productList.map((item: ProductType) => (
              <Grid item xs={2} sx={{ width: "20%" }}>
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
                    <Typography
                      variant="body2"
                      sx={{
                        marginTop: "20px",
                        textAlign: "center",
                        overflow: "hidden",
                        maxHeight: "20px",
                        marginX: "auto",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.name}
                    </Typography>
                  </NoneStyledLink>
                  <Divider variant="middle" flexItem sx={{ marginY: "12px" }} />
                  <NoneStyledLink to={`/products/${item.id}`}>
                    {item.sale > 0 ? (
                      <>
                        <Typography
                          component="span"
                          sx={{
                            textDecoration: "line-through",
                            color: "#888888",
                            fontSize: "14px",
                          }}
                        >
                          {item.price}원
                        </Typography>
                        <Typography
                          component="span"
                          sx={{
                            color: "#000",
                            fontWeight: "600",
                            fontSize: "15px",
                            marginLeft: "3px",
                          }}
                        >
                          {item.calculatePrice}원
                        </Typography>{" "}
                      </>
                    ) : (
                      <Typography
                        component="span"
                        sx={{
                          color: "#000",
                          fontWeight: "600",
                          fontSize: "15px",
                          marginLeft: "3px",
                        }}
                      >
                        {item.price}원
                      </Typography>
                    )}
                  </NoneStyledLink>
                </div>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Product;
