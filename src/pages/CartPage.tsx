import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CartListState, ConfirmButtonState } from "../atom/Cart";
import Typography from "@mui/material/Typography";

import RemoveConfirmationDialog from "../components/Cart/CartpopUp";
import CartEmpty from "../components/Cart/CartEmpty";
import CartItems from "../components/Cart/CartItems";

const ShoppingCartPage = () => {
  const cartItems = useRecoilValue(CartListState);
  const setCartItems = useSetRecoilState(CartListState);
  const [confirmRemoveProductId, setConfirmRemoveProductId] =
    useRecoilState(ConfirmButtonState);

  // 수량 조절 => quantity가 0이 되었을 때 상품삭제 확인문구 //
  const handleConfirmRemove = (confirmed: boolean) => {
    if (confirmed && confirmRemoveProductId !== null) {
      const updatedCartItems = cartItems.filter(
        (item) => item.id !== confirmRemoveProductId
      );
      setCartItems(updatedCartItems);
    }
    setConfirmRemoveProductId(null);
  };

  return (
    <div
      style={{
        minHeight: "600px",
        marginTop: "30px",
        marginBottom: "50px",
        paddingLeft: "50px",
      }}
    >
      <div
        style={{ width: "fit-content", margin: "0 auto", marginBottom: "30px" }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ borderBottom: "solid 1px", textAlign: "center" }}
        >
          장바구니
        </Typography>
      </div>

      {cartItems.length === 0 ? <CartEmpty /> : <CartItems />}
      <RemoveConfirmationDialog
        open={confirmRemoveProductId !== null}
        onClose={handleConfirmRemove}
      />
    </div>
  );
};

export default ShoppingCartPage;
