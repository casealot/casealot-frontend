import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useRecoilState } from "recoil";
import { fakeProduct, ProductListAtom } from "../atom/Product";

const ProductPage = () => {
  const [productList, setProductList] =
    useRecoilState<fakeProduct[]>(ProductListAtom);

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
              color="text.primary"
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
          {/* End hero unit */}
          <Grid container spacing={4} gap={2} rowGap={4}>
            {productList.map((card) => (
              <Grid key={card.id} xs={12} sm={6} md={2.9}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      pt: "100%",
                    }}
                    image={card.image}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      sx={{
                        maxHeight: "33px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      sx={{
                        maxHeight: "50px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "end" }}></CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default ProductPage;
