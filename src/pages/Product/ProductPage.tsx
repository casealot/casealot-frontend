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
  const productList = useRecoilValue<ProductType[]>(ProductListAtom);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [productItems, setProductItems] = useState<ProductType[]>([]);

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["getProducts"],
    async ({ pageParam = page }) => {
      const response = await api.post("/cal/v1/product", {
        filter: [],
        page: pageParam,
        query: "",
        size: 12,
        sort: [{ field: "price", option: "desc" }],
      });

      return response.data.body.product.items;
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 0) {
          return false;
        }
        return lastPage.length;
      },
    }
  );
  console.log(data);

  useEffect(() => {
    if (data) {
      setProductItems((prevItems) => [...prevItems, ...data.pages.flat()]);
      setHasMore(hasNextPage ?? false);
    }
  }, [data]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      fetchNextPage().then(({ data }) => {
        setPage(Number(data?.pageParams));
        setHasMore(hasNextPage ?? false);
      });
    }
  };

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
              dataLength={productItems.length}
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
                sx={{ justifyContent: "center" }}
              >
                {productItems.map((card) => (
                  <Grid key={card.id} xs={12} sm={6} md={2.5}>
                    <NoneStyledLink to={`/products/${card.id}`}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {card.thumbnail && card.thumbnail.url ? (
                          <CardMedia
                            component="div"
                            sx={{
                              pt: "100%",
                              height: "fit-content",
                              borderBottom: "2px solid #808080",
                            }}
                            image={card.thumbnail.url}
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
                            {card.name}
                          </Typography>
                          <Typography
                            sx={{
                              maxHeight: "50px",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                            }}
                          >
                            {card.price}원
                          </Typography>
                        </CardContent>
                        <CardActions
                          sx={{ justifyContent: "end" }}
                        ></CardActions>
                      </Card>
                    </NoneStyledLink>
                  </Grid>
                ))}
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
