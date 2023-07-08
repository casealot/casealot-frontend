import React from "react";
import styled from "styled-components";
import DetailRightTop from "./ProductDetailRightTop";
import { Rating, Button } from "@mui/material";
import ready from "../../dummy/img/noimage.gif";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
const DetailTopWrapper = styled.div`
  width: 1180px;
  margin: 0 auto;
  margin-top: 80px;
  display: flex;
  margin-bottom: 50px;
`;

const ThumbNail = styled.img`
  position: relative;
  width: 600px;
  height: 600px;
  padding-left: 50px;
  margin-right: auto;
  transform: scale(0.8);
`;

interface DetailTopProps {
  thumbnailUrl: string;
  name: string;
  price: number;
  sale: number;
  calculatePrice: number;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  rating: number;
  ratingCount: number;
  wishboolean: string;
  wishCountState: string;
  handleWishAdd: () => void;
  handleWishRemove: () => void;
  handleAddToCart: () => void;
  onSubmitOrder: () => void;
}

const ProductDetailTop: React.FC<DetailTopProps> = ({
  thumbnailUrl,
  name,
  price,
  calculatePrice,
  quantity,
  sale,
  setQuantity,
  rating,
  ratingCount,
  wishboolean,
  wishCountState,
  handleWishAdd,
  handleWishRemove,
  handleAddToCart,
  onSubmitOrder,
}) => {
  return (
    <DetailTopWrapper>
      {thumbnailUrl ? (
        <ThumbNail src={thumbnailUrl} />
      ) : (
        <ThumbNail src={ready} />
      )}

      <div style={{ width: "470px", textAlign: "left", paddingTop: "20px" }}>
        <DetailRightTop
          name={name}
          price={price}
          calculatePrice={calculatePrice}
          quantity={quantity}
          sale={sale}
          setQuantity={setQuantity}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            paddingTop: "20px",
            alignItems: "center",
          }}
        >
          <Rating value={rating} readOnly />
          <span style={{ marginLeft: "10px" }}> {ratingCount} 건</span>
          {wishboolean === "N" ? (
            <Button
              style={{
                alignItems: "right",
                fontSize: "23px",
                verticalAlign: "baseline",
                marginLeft: "auto",
              }}
              onClick={handleWishAdd}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <FavoriteBorderIcon sx={{ paddingTop: "2px" }} />
                <span style={{ color: "#d0d0d0", fontSize: "18px" }}>
                  {wishCountState}
                </span>
              </div>
            </Button>
          ) : (
            <Button
              style={{
                alignItems: "right",
                fontSize: "23px",
                verticalAlign: "baseline",
                marginLeft: "auto",
              }}
              onClick={handleWishRemove}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <FavoriteIcon sx={{ paddingTop: "2px" }} />
                <span style={{ color: "#d0d0d0", fontSize: "18px" }}>
                  {wishCountState}
                </span>
              </div>
            </Button>
          )}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "20px",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              width: "220px",
              marginRight: "auto",
              fontSize: "16px",
              fontWeight: "500",
              color: "#000",
              borderColor: "#000",
            }}
            onClick={handleAddToCart}
          >
            장바구니 담기
          </Button>
          <Button
            variant="contained"
            size="large"
            sx={{
              width: "220px",
              marginLeft: "auto",
              fontSize: "16px",
              fontWeight: "500",
              color: "#fff",
              borderColor: "#000",
              backgroundColor: "#000",
            }}
            onClick={onSubmitOrder}
          >
            바로구매
          </Button>
        </div>
      </div>
    </DetailTopWrapper>
  );
};

export default ProductDetailTop;
