import { Container, Typography } from "@mui/material";
import ProdcutEditor from "../components/Admin/AddProduct";

const ProductRegistPage = () => {
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ minHeight: "800px", marginBottom: "200px" }}
      >
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="blue"
          gutterBottom
          paddingTop={10}
          sx={{ margin: "50px 0" }}
        >
          ProductEditor
        </Typography>
        <ProdcutEditor />
      </Container>
    </>
  );
};

export default ProductRegistPage;
