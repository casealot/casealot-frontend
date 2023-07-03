import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CartListState, ConfirmButtonState } from "../atom/Cart";
import RemoveConfirmationDialog from "../components/Cart/CartpopUp";
import CartEmpty from "../components/Cart/CartEmpty";
import CartItems from "../components/Cart/CartItems";
import Banner from "../components/Useable/Banner";
import { Container } from "@mui/material";

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
    <Container maxWidth="xl">
      <div
        style={{
          minHeight: "600px",
          marginTop: "30px",
          marginBottom: "50px",
        }}
      >
        <Banner item="CART" />

        {cartItems.length === 0 ? <CartEmpty /> : <CartItems />}
        <RemoveConfirmationDialog
          open={confirmRemoveProductId !== null}
          onClose={handleConfirmRemove}
        />
      </div>
    </Container>
  );
};

export default ShoppingCartPage;
