import { useEffect, useState } from "react";
import { api } from "../../atom/apiCall";
import { ProductType } from "../../atom/Product";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Container,
  Typography,
} from "@mui/material";
import ready from "../../dummy/img/imgready.gif";
import { useNavigate } from "react-router-dom";

const ProductState = () => {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductType[]>([]);
  const getProduct = async () => {
    const response = await api.post("/cal/v1/product", {
      filter: [],
      page: page,
      query: "",
      size: 10,
      sort: [{ field: "price", option: "desc" }],
    });
    return response.data.body.product.items;
  };

  const goToPreviousPage = () => {
    setPage(page - 1);
  };

  const goToNextPage = () => {
    setPage(page + 1);
  };

  const handleEditProduct = (productId: number) => {
    navigate(`/admin/edit/${productId}`);
    console.log("Edit product:", productId);
  };

  const handleDeleteProduct = async (productId: number) => {
    await api.delete(`/cal/v1/admin/product/${productId}`);
    const updatedProducts = await getProduct(); // 삭제 후 업데이트된 상품 데이터를 받아옴
    setProducts(updatedProducts);
  };

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getProduct();
      setProducts(productsData);
    };
    fetchData();
  }, [page]);

  return (
    <Container maxWidth="lg">
      <Typography
        component="h2"
        variant="h3"
        align="center"
        color="blue"
        gutterBottom
        paddingTop={10}
        sx={{ margin: "50px 0" }}
      >
        Edit Product
      </Typography>
      <TableContainer
        sx={{
          marginBottom: "30px",
          maxWidth: "lg",
          marginX: "auto",
          maxHeight: "1200px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "600" }}>Image</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Price</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Sale</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>SalePrice</TableCell>
              <TableCell sx={{ fontWeight: "600" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products && products.length > 0 ? (
              products.map((product: ProductType) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.thumbnail && product.thumbnail.url ? (
                      <img
                        src={product.thumbnail.url}
                        alt={product.name}
                        style={{
                          width: "50px",
                          height: "50px",
                        }}
                      />
                    ) : (
                      <img
                        src={ready}
                        style={{
                          width: "50px",
                          height: "50px",
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price} 원</TableCell>
                  <TableCell>{product.sale}%</TableCell>
                  <TableCell sx={{ color: "blue" }}>
                    {product.calculatePrice} 원
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleEditProduct(product.id)}
                      style={{ marginRight: "3px" }}
                    >
                      수정
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>More</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>
                  <Button onClick={() => navigate("/admin/addproduct")}>
                    상품등록
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Button onClick={goToPreviousPage} disabled={page === 0}>
        이전
      </Button>
      <Button onClick={goToNextPage}>다음</Button>
    </Container>
  );
};

export default ProductState;
