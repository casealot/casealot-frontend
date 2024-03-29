import { Divider, Grid } from "@mui/material";
import { Container } from "@mui/system";
import { useQueryClient, useMutation, useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { FilterValueType, ProductType } from "../../atom/Product";
import { api } from "../../atom/apiCall";
import { colorOptions } from "../../components/Product/ColorPicker";
import Loading from "../../components/Useable/Loading";
import ProductCard from "../../components/Product/ProductCard";
import ProductFilter from "../../components/Product/ProductFilter";

const CategoryPage = () => {
  const [categoryName, setCategoryName] = useState<string>("");
  const { category } = useParams();

  useEffect(() => {
    const lowercaseCategoryName = String(category).toLowerCase();
    if (lowercaseCategoryName === "new" || lowercaseCategoryName === "best") {
      setCategoryName(`type/${lowercaseCategoryName}`);
      setPage(1);
    } else if (lowercaseCategoryName === "all") {
      setCategoryName("");
      setPage(1);
    } else {
      setCategoryName(`category/${lowercaseCategoryName}`);
      setPage(1);
    }
  }, [category]);
  
  const [filterValue, setFilterValue] = useState<FilterValueType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortOption, setSortOption] = useState("rating");
  const [sortOrder, setSortOrder] = useState("desc");
  const [totalProduct, setTotalProduct] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  
  useEffect(() => {
    setFilterValue([{ key: "", operation: "", value: null }]);
    setSelectedPrice("");
    setSelectedColor("");
  }, [categoryName]);
  let size = 12;

  const queryClient = useQueryClient();

  const { mutate: sortMutation } = useMutation<void, unknown, [string, string]>(
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
  );

  // const { data, isLoading, fetchNextPage } = useProductList({ categoryName, page, size, sortOption, sortOrder, filterValue})
  const { data, isLoading, fetchNextPage } = useInfiniteQuery(
    ["getProducts", sortOption, sortOrder, filterValue, categoryName],
    async ({ pageParam = page - 1 }) => {
      const response = await api.post(`/cal/v1/product/${categoryName}`, {
        filter: filterValue,
        page: pageParam,
        query: "",
        size: size - 8,
        sort: [{ field: sortOption, option: sortOrder }],
      });

      setTotalProduct(response.data.body.product.totalCount);
      return response.data.body.product.items;
    },
    {
      enabled: categoryName !== null,
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

  const applyFilterMutation = useMutation(
    async () => {
      const filterValues: FilterValueType[] = [];

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
  };

  const handlePriceSelect = (price: string) => {
    setSelectedPrice(price);
  };

  const removeColorFilter = () => {
    setSelectedColor("");
  };

  const removePriceFilter = () => {
    setSelectedPrice("");
  };

  const removeFilters = () => {
    setSelectedColor("");
    setSelectedPrice("");
  };

  useEffect(() => {
    applyFilterMutation.mutate();
  },[selectedColor, selectedPrice])
  return (
    <>
      <main>
      {/* 필터, 정렬 Props */}
      <ProductFilter category={category? category : ""}
      selectedColor={selectedColor}
      handleColorSelect={handleColorSelect}
      selectedPrice={selectedPrice}
      handlePriceSelect={handlePriceSelect}
      sortOption={sortOption}
      sortOrder={sortOrder}
      handleSortChange={handleSortChange}
      removeColorFilter={removeColorFilter}
      removePriceFilter={removePriceFilter}
      removeFilters={removeFilters}/>

        {/* 메인, 상품 인피니티 스크롤 */}
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
                      // Grid 영역 Props
                      <ProductCard key={item.id} item={item}/>
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

export default CategoryPage;
