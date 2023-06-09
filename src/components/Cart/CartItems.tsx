// import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useRecoilState, useSetRecoilState } from "recoil";
import { CartListState, ConfirmButtonState, cartItems } from "../../atom/Cart";
import ready from "../../dummy/img/imgready.gif";
import {
  IconButton,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { api } from "../../atom/apiCall";
import { useEffect, useState } from "react";
import { Container } from "@mui/system";

const CartItems = () => {
  const [cartItems, setCartItems] = useRecoilState<cartItems[]>(CartListState);
  const setConfirmRemoveProductId = useSetRecoilState(ConfirmButtonState);
  const [cart, setCart] = useState([]);

  // 상품 삭제버튼 이벤트 //
  const handleRemoveFromCart = async (productId: number) => {
    const response = await api.delete(`cal/v1/cart/${productId}`);
    setCartItems(response.data.body.cart.products);
  };

  const handleDeleteAll = async () => {
    const response = await api.delete("cal/v1/cart/clear");
    setCartItems([]);
  };
  //상품 수량 조절 이벤트 //
  // const handleQuantityChange = (productId: number, newQuantity: number) => {
  //   if (newQuantity === 0) {
  //     setConfirmRemoveProductId(productId);
  //   } else {
  //     const updatedCartItems = cartItems.map((item) => {
  //       if (item.id === productId) {
  //         return { ...item, quantity: newQuantity };
  //       }
  //       return item;
  //     });
  //     setCartItems(updatedCartItems);
  //   }
  // };

  const handleQuantityAdd = async (id: number) => {
    const response = await api.post(`cal/v1/cart/add/${id}`);
    if (response) {
      setCartItems(response.data.body.cart.products);
    }
  };
  const handleQuantityReduce = async (id: number) => {
    const response = await api.post(`cal/v1/cart/reduce/${id}`);
    if (response) {
      setCartItems(response.data.body.cart.products);
    }
  };

  return (
    <Container maxWidth="xl">
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button
          onClick={handleDeleteAll}
          variant="contained"
          sx={{ marginBottom: "20px" }}
        >
          장바구니 비우기
        </Button>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      width="100%"
                      height="100%"
                      style={{ maxWidth: "200px", maxHeight: "200px" }}
                    />
                  ) : (
                    <img
                      src={ready}
                      width="100%"
                      height="100%"
                      style={{ maxWidth: "200px", maxHeight: "200px" }}
                    />
                  )}
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price}원</TableCell>
                <TableCell>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Button onClick={() => handleQuantityReduce(item.id)}>
                      <RemoveCircleOutlineIcon />
                    </Button>

                    <Typography variant="body1">{item.quantity}</Typography>
                    <Button onClick={() => handleQuantityAdd(item.id)}>
                      <AddCircleOutlineIcon />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">
                    {item.quantity * Number(item.price)}원
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="Delete"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CartItems;
