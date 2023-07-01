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
import {
  Chip,
  Divider,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
  Button,
} from "@mui/material";
import {
  ColorFilterButtons,
  colorOptions,
} from "../../components/Product/ColorPicker";
import SortOptionButtons from "../../components/Product/SortOptionButtons";
import PriceFilterButtons from "../../components/Product/PriceFilter";
import banner from "../../dummy/img/banner.jpg";
import { height } from "@mui/system";
const ProductPage = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortOption, setSortOption] = useState("rating");
  const [sortOrder, setSortOrder] = useState("desc");
  const [totalProduct, setTotalProduct] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  const [filterValue, setFilterValue] = useState<
    {
      key: string;
      operation: string;
      value: string | number | null | undefined;
    }[]
  >([{ key: "", operation: "", value: null }]);
  const size = 12;

  const queryClient = useQueryClient();

  const sortMutation = useMutation<void, unknown, [string, string]>(
    async ([sortOption, sortOrder]) => {
      await api.post("/cal/v1/product/", {
        filter: [filterValue],
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
    ["getProducts", sortOption, sortOrder, filterValue],
    async ({ pageParam = page - 1 }) => {
      const response = await api.post("/cal/v1/product/", {
        filter: filterValue,
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

  const applyFilterMutation = useMutation(
    async () => {
      const filterValues: {
        key: string;
        operation: string;
        value: string | number | null | undefined;
      }[] = [];

      if (selectedColor) {
        const convertedColor = colorOptions.find(
          (option) => option.value === selectedColor
        )?.label;
        filterValues.push({
          key: "color",
          operation: ":",
          value: convertedColor,
        });
      }

      if (selectedPrice) {
        if (selectedPrice === "30000") {
          filterValues.push({ key: "price", operation: "<", value: 30000 });
        } else if (selectedPrice === "30000-50000") {
          filterValues.push(
            { key: "price", operation: ">", value: 30000 },
            { key: "price", operation: "<", value: 50000 }
          );
        } else if (selectedPrice === "50000-100000") {
          filterValues.push(
            { key: "price", operation: ">", value: 50000 },
            { key: "price", operation: "<", value: 100000 }
          );
        } else if (selectedPrice === "100000") {
          filterValues.push({ key: "price", operation: ">", value: 100000 });
        }
      }
      setFilterValue(filterValues);
    },
    {
      onSuccess: () => {
        setPage(1); // 페이지를 1로 리셋
        queryClient.invalidateQueries([
          "getProducts",
          selectedColor,
          selectedPrice,
          filterValue,
        ]);
      },
    }
  );

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    applyFilterMutation.mutate(); // 필터 적용
  };

  const handlePriceSelect = (price: string) => {
    setSelectedPrice(price);
    applyFilterMutation.mutate(); // 필터 적용
  };

  const removeColorFilter = () => {
    setSelectedColor("");
    applyFilterMutation.mutate();
  };

  const removePriceFilter = () => {
    setSelectedPrice("");
    applyFilterMutation.mutate();
  };

  const removeFilters = () => {
    setSelectedColor("");
    setSelectedPrice("");
    applyFilterMutation.mutate();
  };
  return (
    <>
      <main>
        <div
          style={{
            display: "flex",
            height: "60px",
            fontWeight: "500",
            borderBottom: "1px solid #d3d3d3",
            borderTop: "3px solid #808080",
            marginBottom: "50px",
          }}
        >
          <Container maxWidth="xl">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                borderLeft: "1px solid #d3d3d3",
                borderRight: "1px solid #d3d3d3",
                height: "100%",
                alignItems: "center",
              }}
            >
              <span style={{ marginRight: "50px" }}>전체보기</span>
              <span style={{ margin: "0 50px" }}>베스트</span>
              <span style={{ margin: "0 50px" }}>신상</span>
              <span style={{ margin: "0 50px" }}>의류</span>
              <span style={{ margin: "0 50px" }}>모자</span>
              <span style={{ margin: "0 50px" }}>ACC</span>
              <span style={{ margin: "0 50px" }}>시즌오프</span>
              <span style={{ margin: "0 50px" }}>룩북</span>
              <span style={{ margin: "0 50px" }}>빈칸</span>
            </div>
          </Container>
        </div>

        <Container maxWidth="xl">
          <div
            style={{
              width: "100%",
              height: "180px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: `url(${banner})`,
              backgroundSize: "cover",
              backgroundPosition:
                "center" /* 기타 배경 이미지 스타일을 설정합니다 */,
              color: "#fff",
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            <Typography variant="h3">PRODUCTS</Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              margin: "20px 0",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                marginY: "auto",
                fontWeight: "600",
                marginRight: "20px",
              }}
            >
              색상
            </Typography>
            <ColorFilterButtons
              selectedColor={selectedColor}
              onColorSelect={handleColorSelect}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "left",
              margin: "20px 0",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                marginY: "auto",
                fontWeight: "600",
                marginRight: "20px",
              }}
            >
              가격
            </Typography>
            <PriceFilterButtons
              selectedPrice={selectedPrice}
              onPriceSelect={handlePriceSelect}
            />
          </div>
          <SortOptionButtons
            sortOption={sortOption}
            sortOrder={sortOrder}
            handleSortChange={handleSortChange}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              margin: "20px 0",
              paddingBottom: "50px",
              alignItems: "center",
              borderBottom: "1px solid #d3d3d3",
            }}
          >
            {selectedColor || selectedPrice ? (
              <>
                <Typography
                  sx={{
                    fontSize: "20px",
                    marginY: "auto",
                    fontWeight: "600",
                    marginRight: "20px",
                  }}
                >
                  필터
                </Typography>
                {selectedColor && (
                  <Chip
                    label={`색상: ${selectedColor}`}
                    onDelete={removeColorFilter}
                    color="secondary"
                    size="small"
                    sx={{ marginRight: "10px" }}
                  />
                )}
                {selectedPrice && (
                  <Chip
                    label={`가격: ${selectedPrice}`}
                    onDelete={removePriceFilter}
                    color="secondary"
                    size="small"
                    sx={{ marginRight: "10px" }}
                  />
                )}
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={removeFilters}
                >
                  모든 필터 삭제
                </Button>
              </>
            ) : (
              <Typography
                sx={{
                  fontSize: "20px",
                  marginY: "auto",
                  fontWeight: "600",
                  marginRight: "20px",
                }}
              >
                선택된 필터 없음
              </Typography>
            )}
          </div>
        </Container>

        <Container sx={{ padding: "0" }} maxWidth="xl">
          <div style={{ padding: "0", width: "100%" }}>
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
                  rowGap={4}
                  gap={6}
                  sx={{
                    justifyContent: "center",
                    marginTop: "20px",
                    maxWidth: "100%",
                  }}
                >
                  {data?.pages.map((card) =>
                    card.map((item: ProductType) => (
                      <Grid key={item.id} xs={12} sm={6} md={2.7}>
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
                                {item.type === "NEW" && (
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
                                {item.type === "BEST" && (
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
                              sx={{
                                flexGrow: 1,
                                borderTop: "2px solid #d3d3d3",
                              }}
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
                                      {calculateDiscount(item.price, item.sale)}
                                      원
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
          </div>
        </Container>
      </main>
    </>
  );
};

export default ProductPage;
