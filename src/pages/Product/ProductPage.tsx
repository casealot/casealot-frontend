import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ready from "../../dummy/img/imgready.gif";
import { useRecoilValue } from "recoil";
import { ProductType, ProductListAtom } from "../../atom/Product";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { NoneStyledLink } from "../../components/Useable/Link";
import { api } from "../../atom/apiCall";
import { useEffect, useState } from "react";
import Loading from "../../components/Useable/Loading";
import { Divider } from "@mui/material";

const ProductPage = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [size, setSize] = useState(12);

  console.log("hasMore");
  const { data, isLoading, fetchNextPage } = useInfiniteQuery(
    ["getProducts"],
    async ({ pageParam = page - 1 }) => {
      const response = await api.post("/cal/v1/product/", {
        filter: [],
        page: pageParam,
        query: "",
        size: size,
        sort: [{ field: "price", option: "desc" }],
      });
      setTotalCount(response.data.body.product.totalPages);
      setTotalProduct(response.data.body.product.totalCount);
      return response.data.body.product.items;
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: () => page,
    }
  );

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      fetchNextPage();
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (data)
      setHasMore(
        data.pages.flatMap((item) => item).length < totalProduct ? true : false
      );
  }, [data, totalProduct]);

  return (
    <>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="blue"
              gutterBottom
            >
              PRODUCTS
            </Typography>

            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            ></Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="xl">
          {data ? (
            <InfiniteScroll
              dataLength={data?.pages?.flatMap((item) => item).length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={<Loading />}
              endMessage={
                <>
                  <p style={{ fontSize: "40px" }}>
                    <Divider sx={{ marginBottom: "20px" }} />
                    NO MORE PRODUCTS
                  </p>
                </>
              }
            >
              <Grid
                container
                spacing={4}
                gap={5}
                rowGap={4}
                sx={{ justifyContent: "center", marginTop: "20px" }}
              >
                {data?.pages.map((card) =>
                  card.map((item: ProductType) => (
                    <Grid
                      key={item.id}
                      xs={12}
                      sm={6}
                      md={2.5}
                      sx={{ border: "1px solid #d3d3d3" }}
                    >
                      <NoneStyledLink to={`/products/${item.id}`}>
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          {item.thumbnail && item.thumbnail.url ? (
                            <CardMedia
                              component="div"
                              sx={{
                                pt: "100%",
                                height: "fit-content",
                                borderBottom: "2px solid #808080",
                              }}
                              image={item.thumbnail.url}
                            />
                          ) : (
                            <CardMedia
                              component="div"
                              sx={{
                                pt: "100%",
                                borderBottom: "2px solid #808080",
                              }}
                              image={ready}
                            />
                          )}

                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="h3"
                              sx={{
                                maxHeight: "33px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {item.name}
                            </Typography>
                            <Typography
                              sx={{
                                maxHeight: "50px",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                              }}
                            >
                              {item.price}원
                            </Typography>
                          </CardContent>
                          <CardActions
                            sx={{ justifyContent: "end" }}
                          ></CardActions>
                        </Card>
                      </NoneStyledLink>
                    </Grid>
                  ))
                )}
              </Grid>
            </InfiniteScroll>
          ) : (
            <Loading />
          )}
        </Container>
      </main>
    </>
  );
};

export default ProductPage;
