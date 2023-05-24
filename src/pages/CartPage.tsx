import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CartListState } from "../atom/Cart";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import emptyCartImg from "../dummy/img/empty-cart.png";
import Button from "@mui/material/Button";

const ShoppingCartPage = () => {
  const cartItems = useRecoilValue(CartListState);
  const setCartItems = useSetRecoilState(CartListState);

  const handleRemoveFromCart = (productId: number) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  return (
    <div
      style={{ minHeight: "600px", marginTop: "30px", marginBottom: "50px" }}
    >
      <div style={{ width: "fit-content", margin: "0 auto" }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ borderBottom: "solid 1px", textAlign: "center" }}
        >
          장바구니
        </Typography>
      </div>
      {cartItems.length === 0 ? (
        <>
          <img
            src={emptyCartImg}
            style={{
              maxWidth: "400px",
              margin: "30px 70px 10px 0",
            }}
          />
          <Typography
            variant="body1"
            sx={{ marginTop: "20px", fontSize: "28px" }}
          >
            텅
          </Typography>
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
              marginY: "10px",
            }}
          >
            담으러가기
          </Button>
        </>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
              }}
            >
              <img
                src={item.image}
                width="100%"
                height="100%"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
              <Typography variant="subtitle1">{item.title}</Typography>
              <Typography variant="body1">${item.price}</Typography>
              <Typography variant="body1">수량: {item.quantity}</Typography>
              <IconButton
                aria-label="Delete"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShoppingCartPage;
