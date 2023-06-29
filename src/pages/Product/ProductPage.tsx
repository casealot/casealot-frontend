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
import { ProductType } from "../../atom/Product";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { NoneStyledLink } from "../../components/Useable/Link";
import { api } from "../../atom/apiCall";
import { useEffect, useState } from "react";
import Loading from "../../components/Useable/Loading";
import { Button, Chip, Divider } from "@mui/material";

import {
  ColorFilterButtons,
  colorOptions,
} from "../../components/Product/ColorPicker";

const ProductPage = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortOption, setSortOption] = useState("rating");
  const [sortOrder, setSortOrder] = useState("desc");
  const [totalProduct, setTotalProduct] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [filterValue, setFilterValue] = useState({
    key: "",
    operation: "",
    value: "",
  });
  const size = 12;

  const queryClient = useQueryClient();

  const sortMutation = useMutation<void, unknown, [string, string]>(
    async ([sortOption, sortOrder]) => {
      await api.post("/cal/v1/product/", {
        filter: [],
        page: 0,
        query: "",
        size: size,
        sort: [{ field: sortOption, option: sortOrder }],
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getProducts", sortOption, sortOrder]);
      },
    }
  ).mutate;

  const { data, isLoading, fetchNextPage } = useInfiniteQuery(
    ["getProducts", sortOption, sortOrder, selectedColor],
    async ({ pageParam = page - 1 }) => {
      const response = await api.post("/cal/v1/product/", {
        filter: [filterValue],
        page: pageParam,
        query: "",
        size: size,
        sort: [{ field: sortOption, option: sortOrder }],
      });

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

  const handleSortChange = (option: string) => {
    setPage(1);
    if (sortOption === option) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortOption(option);
      setSortOrder("desc");
    }
    sortMutation([option, sortOrder]);
  };

  const calculateDiscount = (price: number, sale: number) => {
    const discountedPrice = price - (price * sale) / 100;
    return discountedPrice.toFixed(0);
  };
  const handleImageHover = (event: React.MouseEvent<HTMLDivElement>) => {
    const cardMediaElement = event.currentTarget as HTMLDivElement;
    cardMediaElement.style.transform = "scale(1.1)";
    cardMediaElement.style.transition = "transform 0.2s ease";
  };

  const handleImageLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const cardMediaElement = event.currentTarget as HTMLDivElement;
    cardMediaElement.style.transform = "scale(1)";
  };
  const applyFilter = (color: string | undefined) => {
    if (color) setFilterValue({ key: "color", operation: ":", value: color });
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    const convertedColor = colorOptions.find(
      (option) => option.value === color
    )?.label;
    applyFilter(convertedColor);
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
          <Container maxWidth="lg">
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
              spacing={1}
              justifyContent="center"
            >
              <ColorFilterButtons
                selectedColor={selectedColor}
                onColorSelect={handleColorSelect}
              />
            </Stack>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={1}
              justifyContent="center"
            >
              <Button
                variant={sortOption === "wishCount" ? "contained" : "outlined"}
                onClick={() => handleSortChange("wishCount")}
              >
                찜한순{" "}
                {sortOption === "wishCount" && sortOrder === "desc" && "▼"}
                {sortOption === "wishCount" && sortOrder === "asc" && "▲"}
              </Button>
              <Button
                variant={sortOption === "price" ? "contained" : "outlined"}
                onClick={() => handleSortChange("price")}
              >
                가격순 {sortOption === "price" && sortOrder === "desc" && "▼"}
                {sortOption === "price" && sortOrder === "asc" && "▲"}
              </Button>
              <Button
                variant={sortOption === "sale" ? "contained" : "outlined"}
                onClick={() => handleSortChange("sale")}
              >
                할인율순 {sortOption === "sale" && sortOrder === "desc" && "▼"}
                {sortOption === "sale" && sortOrder === "asc" && "▲"}
              </Button>
              <Button
                variant={sortOption === "sells" ? "contained" : "outlined"}
                onClick={() => handleSortChange("sells")}
              >
                판매순 {sortOption === "sells" && sortOrder === "desc" && "▼"}
                {sortOption === "sells" && sortOrder === "asc" && "▲"}
              </Button>
              <Button
                variant={sortOption === "rating" ? "contained" : "outlined"}
                onClick={() => handleSortChange("rating")}
              >
                평점순 {sortOption === "rating" && sortOrder === "desc" && "▼"}
                {sortOption === "rating" && sortOrder === "asc" && "▲"}
              </Button>
              <Button
                variant={
                  sortOption === "ratingCount" ? "contained" : "outlined"
                }
                onClick={() => handleSortChange("ratingCount")}
              >
                리뷰순{" "}
                {sortOption === "ratingCount" && sortOrder === "desc" && "▼"}
                {sortOption === "ratingCount" && sortOrder === "asc" && "▲"}
              </Button>
            </Stack>
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
                    <Grid key={item.id} xs={12} sm={6} md={2.5}>
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

                                position: "relative",
                              }}
                              image={item.thumbnail.url}
                              onMouseOver={handleImageHover}
                              onMouseLeave={handleImageLeave}
                            >
                              {item.type === "new" && (
                                <Chip
                                  label="NEW"
                                  color="success"
                                  sx={{
                                    position: "absolute",
                                    right: "5px",
                                    top: "5px",
                                    fontWeight: "600",
                                  }}
                                />
                              )}{" "}
                              {item.type === "best" && (
                                <Chip
                                  label="BEST"
                                  color="primary"
                                  sx={{
                                    position: "absolute",
                                    right: "5px",
                                    top: "5px",
                                    fontWeight: "600",
                                  }}
                                />
                              )}
                            </CardMedia>
                          ) : (
                            <CardMedia
                              component="div"
                              sx={{
                                pt: "100%",
                                position: "relative",
                              }}
                              image={ready}
                            >
                              {item.type === "new" && (
                                <Chip
                                  label="NEW"
                                  color="success"
                                  sx={{
                                    position: "absolute",
                                    right: "5px",
                                    top: "5px",
                                    fontWeight: "600",
                                  }}
                                />
                              )}{" "}
                              {item.type === "best" && (
                                <Chip
                                  label="BEST"
                                  color="primary"
                                  sx={{
                                    position: "absolute",
                                    right: "5px",
                                    top: "5px",
                                    fontWeight: "600",
                                  }}
                                />
                              )}
                            </CardMedia>
                          )}

                          <CardContent
                            sx={{ flexGrow: 1, borderTop: "2px solid #d3d3d3" }}
                          >
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
                              {item.sale ? (
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
                                  </Typography>{" "}
                                  <Typography
                                    component="span"
                                    sx={{
                                      color: "#000",
                                      fontWeight: "600",
                                      fontSize: "16px",
                                      marginLeft: "3px",
                                    }}
                                  >
                                    {calculateDiscount(item.price, item.sale)}원
                                  </Typography>{" "}
                                </>
                              ) : (
                                `${item.price}원`
                              )}
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
