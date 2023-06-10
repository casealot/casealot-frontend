import { Button, Container, Grid } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import Chip from "@mui/joy/Chip";
import { api } from "../atom/apiCall";
import { useRecoilState } from "recoil";
import { WishType, wishListState } from "../atom/Wish";
import IconButton from "@mui/joy/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
const WishListPage = () => {
  const [wishState, setWishState] = useRecoilState<WishType[]>(wishListState);

  const handleWishDelete = async (id: number) => {
    const response = await api.delete(`cal/v1/wishlist/delete/${id}`);
    setWishState(response.data.body.wishlist);
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
                <AspectRatio ratio="1" sx={{ width: 90 }}>
                  <img
                    src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
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
                    <Link
                      overlay
                      underline="none"
                      href="#interactive-card"
                      sx={{ color: "text.tertiary" }}
                    >
                      {item.price} 원
                    </Link>
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
                  <IconButton
                    variant="plain"
                    sx={{ position: "absolute", right: "10px", top: "6px" }}
                    onClick={() => handleWishDelete(item.id)}
                  >
                    <FavoriteIcon sx={{ color: "blue" }} />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default WishListPage;
