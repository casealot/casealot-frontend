import { Button } from "@mui/material";
import { api } from "../../atom/apiCall";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ProductType } from "../../atom/Product";

const ProductDelete = () => {
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [page, setPage] = useState(0);

  const getProduct = async () => {
    const response = await api.post("/cal/v1/product", {
      filter: [],
      page: page,
      query: "",
      size: 10,
      sort: [],
    });
    console.log(response.data.body.product.items);
    return {
      data: response.data.body.product.items, // Assuming the array of products is in the `data` property of the response
    };
  };

  const { data: products } = useQuery(["products"], getProduct, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (products) {
      setProductList(products.data);
    }
  }, [products, setProductList, page]);

  // const handleDelete = async () => {
  //   api.delete(`cal/v1/admin/product/${}`);
  // };
  const handlePageChange = () => {
    setPage(page + 1);
  };
  return (
    <>
      <Button onClick={handlePageChange}>page</Button>
    </>
  );
};

export default ProductDelete;
