import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CartListState, ConfirmButtonState } from "../../atom/Cart";

const CartItems = () => {
  const cartItems = useRecoilValue(CartListState);
  const setCartItems = useSetRecoilState(CartListState);
  const [confirmRemoveProductId, setConfirmRemoveProductId] =
    useRecoilState(ConfirmButtonState);

  // 상품 삭제버튼 이벤트 //
  const handleRemoveFromCart = (productId: number) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
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
    <div
      style={{
        alignItems: "center",
      }}
    >
      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "30px",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          <img
            src={item.image}
            width="100%"
            height="100%"
            style={{ maxWidth: "200px", maxHeight: "200px" }}
          />
          <div
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "300px",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.title}
            </Typography>
          </div>
          <Typography variant="body1" sx={{ width: "50px" }}>
            ${item.price}
          </Typography>
          <div
            style={{
              display: "flex",
              lineHeight: "20px",
              height: "fit-content",
              width: "250px",
            }}
          >
            <Button
              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
            >
              <AddCircleOutlineIcon />
            </Button>
            <Typography variant="body1" sx={{ marginTop: "8px" }}>
              {item.quantity}
            </Typography>
            <Button
              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
            >
              <RemoveCircleIcon />
            </Button>
            <Typography variant="body1" sx={{ marginTop: "8px" }}>
              {item.quantity * Number(item.price)}
            </Typography>
            <IconButton
              aria-label="Delete"
              onClick={() => handleRemoveFromCart(item.id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
