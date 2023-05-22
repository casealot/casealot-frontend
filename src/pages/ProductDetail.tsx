import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fakeProduct } from "../atom/Product";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  const getProductDetail = async (id: string) => {
    const response = await axios.get("https://fakestoreapi/products");
    return response.data;
  };
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery(["product", id], () => getProductDetail(id as string));
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        console.log("error")
      ) : (
        <h2>{product.title}</h2>
      )}
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: "#fff", height: "100vh" }} />
      </Container>
    </>
  );
};

export default ProductDetail;
