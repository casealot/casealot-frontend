import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../atom/apiCall";
import { FilterValueType } from "../atom/Product"; 
import { ProductType } from "../atom/Product";

interface IProductListParams {
  sortOption: string;
  sortOrder: string;
  filterValue: FilterValueType[];
  categoryName: string;
  size: number;
  page: number;
}

const useProductList = ({
  sortOption,
  sortOrder,
  filterValue,
  categoryName,
  size,
  page,
}: IProductListParams) => {
  const queryKey = [
    "getProducts",
    sortOption,
    sortOrder,
    filterValue,
    categoryName,
  ];

  const fetchProductList = async ({ pageParam = page - 1 }) => {
    const response = await api.post<{
      body: {
        product: {
          totalPages: number;
          totalCount: number;
          items: ProductType[];
        };
      };
    }>(`/cal/v1/product/${categoryName}`, {
      filter: filterValue,
      page: pageParam,
      query: "",
      size: size-8,
      sort: [{ field: sortOption, option: sortOrder }],
    });

    return response.data.body.product;
  };

  const queryOptions = {
    enabled: !!categoryName,
    refetchOnWindowFocus: false,
    getNextPageParam: () => page,
  };

  const { data, isLoading, fetchNextPage, refetch } = useInfiniteQuery(
    queryKey,
    fetchProductList,
    queryOptions
  );

  return { data, isLoading, fetchNextPage, refetch };
};

export default useProductList;
