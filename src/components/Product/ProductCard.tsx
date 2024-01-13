import {
    Typography,
    Chip,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
  } from "@mui/material";
  import { NoneStyledLink } from "../../components/Useable/Link";
  import ready from "../../dummy/img/imgready.gif";
  import { ProductType } from "../../atom/Product";
  
  interface IProductCardProps {
    item: ProductType;
  }
  
  const ProductCard = ({ item }: IProductCardProps) => {
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
  
    return (
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
                      {calculateDiscount(item.price, item.sale)}원
                    </Typography>{" "}
                  </>
                ) : (
                  `${item.price}원`
                )}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "end" }}></CardActions>
          </Card>
        </NoneStyledLink>
      </Grid>
    );
  }
  
  export default ProductCard;