import { Button, Container, Grid } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Chip from "@mui/joy/Chip";
import { api } from "../atom/apiCall";
import { useRecoilState } from "recoil";
import { WishType, wishListState } from "../atom/Wish";
import IconButton from "@mui/joy/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { NoneStyledLink } from "../components/Useable/Link";
import { getWish } from "../atom/Wish";
import { useEffect } from "react";

const WishListPage = () => {
  const [wishState, setWishState] = useRecoilState<WishType[]>(wishListState);

  const getWishList = async () => {
    const response = await api.get("cal/v1/wishlist");
    setWishState(response.data.body.wishlist.productList);
  };

  useEffect(() => {
    getWishList();
  }, []);
  const handleWishDelete = async (id: number) => {
    const response = await api.delete(`cal/v1/wishlist/${id}`);
    setWishState(response.data.body.wishlist.productList);
  };

  return (
    <Container maxWidth="xl" sx={{ minHeight: "50vh" }}>
      <Typography
        level="h5"
        gutterBottom
        sx={{
          textAlign: "center",
          marginTop: "50px",
          borderBottom: "2px solid",
          paddingBottom: "20px",
        }}
      >
        위시리스트
      </Typography>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button>
          <DeleteIcon />
        </Button>
      </div>
      {wishState.length === 0 ? (
        <div>none wish</div>
      ) : (
        <Grid container spacing={2}>
          {wishState.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={index}
              sx={{ marginTop: "10px" }}
            >
              <Card
                variant="outlined"
                orientation="horizontal"
                sx={{
                  width: "100%",
                  marginRight: "20px",
                  "&:hover": {
                    boxShadow: "md",
                    borderColor: "neutral.outlinedHoverBorder",
                  },
                }}
              >
                <NoneStyledLink to={`/products/${item.id}`}>
                  <AspectRatio ratio="1" sx={{ width: 90 }}>
                    <img
                      src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
                      loading="lazy"
                      alt=""
                    />
                  </AspectRatio>
                </NoneStyledLink>
                <CardContent>
                  <Typography
                    level="h2"
                    fontSize="lg"
                    id="card-description"
                    mb={0.5}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    fontSize="sm"
                    aria-describedby="card-description"
                    mb={1}
                  >
                    <Typography sx={{ color: "text.tertiary" }}>
                      {item.price} 원
                    </Typography>
                  </Typography>
                  <Chip
                    variant="outlined"
                    color="primary"
                    size="sm"
                    sx={{ pointerEvents: "none", marginLeft: "5px" }}
                  >
                    {item.season ? item.season : "FREE "}{" "}
                    {item.type ? item.type : "NEW"}
                  </Chip>
                </CardContent>

                <IconButton
                  variant="plain"
                  sx={{
                    position: "absolute",
                    right: "10px",
                    top: "6px",
                    zIndex: "1",
                  }}
                  onClick={() => handleWishDelete(item.id)}
                >
                  <FavoriteIcon sx={{ color: "blue" }} />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default WishListPage;
