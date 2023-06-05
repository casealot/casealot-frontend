// import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CartListState, ConfirmButtonState } from "../../atom/Cart";

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
const CartItems = () => {
  const cartItems = useRecoilValue(CartListState);
  const setCartItems = useSetRecoilState(CartListState);
  const setConfirmRemoveProductId = useSetRecoilState(ConfirmButtonState);

  // 상품 삭제버튼 이벤트 //
  const handleRemoveFromCart = (productId: number) => {
    setConfirmRemoveProductId(productId);
  };

  //상품 수량 조절 이벤트 //
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setConfirmRemoveProductId(productId);
    } else {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      setCartItems(updatedCartItems);
    }
  };
  return (
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
                <img
                  src={item.thumbnail.url}
                  width="100%"
                  height="100%"
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
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
                  <Button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                  >
                    <RemoveCircleOutlineIcon />
                  </Button>

                  <Typography variant="body1">{item.quantity}</Typography>
                  <Button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
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
  );
};

export default CartItems;
