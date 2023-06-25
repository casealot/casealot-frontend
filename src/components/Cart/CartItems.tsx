// import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useRecoilState } from "recoil";
import { CartListState, cartItems } from "../../atom/Cart";
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
import { useState } from "react";
import { Container } from "@mui/system";
import axios from "axios";
import ErrorModal from "../Modal/ErrorHandleModal";
import ConfirmationDialog from "../Useable/ConfirmModal";
import { RequestPayParams, RequestPayResponse } from "../../atom/PortOne";

const CartItems = () => {
  const [cartItems, setCartItems] = useRecoilState<cartItems[]>(CartListState);
  // const setConfirmRemoveProductId = useSetRecoilState(ConfirmButtonState);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [cart, setCart] = useState([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  // 상품 삭제버튼 이벤트 //
  const handleRemoveFromCart = async (productId: number) => {
    try {
      const response = await api.delete(`cal/v1/cart/${productId}`);
      setCartItems(response.data.body.cart.products);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleOpenErrorModal(error.response?.data.message);
      }
    }
  };

  const handleDeleteAll = async () => {
    try {
      await api.delete("cal/v1/cart/clear");
      setCartItems([]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleOpenErrorModal(error.response?.data.message);
      }
    }
  };

  const handleQuantityAdd = async (id: number) => {
    try {
      const response = await api.post(`cal/v1/cart/add/${id}`);
      if (response) {
        setCartItems(response.data.body.cart.products);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleOpenErrorModal(error.response?.data.message);
      }
    }
  };
  const handleQuantityReduce = async (id: number) => {
    try {
      const response = await api.post(`cal/v1/cart/reduce/${id}`);
      if (response) {
        setCartItems(response.data.body.cart.products);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleOpenErrorModal(error.response?.data.message);
      }
    }
  };

  const handleOpenConfirmation = () => {
    setIsConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleOpenErrorModal = (errorMessage: string) => {
    setErrorMessage(errorMessage);
    setIsErrorModalOpen(true);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const callback = async (response: RequestPayResponse) => {
    const { success, error_msg } = response;

    if (success) {
      alert("결제 성공");

      const res = await api.put(
        `http://43.201.170.8:8000/cal/v1/verifyIamport/${response.merchant_uid}`,
        `${response.imp_uid}`,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      if (res) {
        await api.post(`cal/v1/order/${res.data.orderId}/complete`);
      }
      console.log(response);
      console.log(response.imp_uid);
      console.log(response.merchant_uid);
      setCartItems([]);
    } else {
      handleOpenErrorModal(error_msg);
    }
  };

  const onSubmitOrder = async () => {
    try {
      const response = await api.post("cal/v1/order", {
        orderProducts: cartItems.map((cart) => {
          return {
            productId: cart.id,
            quantity: cart.quantity,
          };
        }),
      });
      const responseData = response.data.body.order;
      if (response && responseData) {
        const res = await api.post("cal/v1/verifyIamport", {
          amount: responseData.totalAmount,
          orderNumber: responseData.orderNumber,
        });
        if (res) {
          if (!window.IMP) {
            return;
          } else {
            const { IMP } = window;
            IMP.init("imp48116556");

            const ProductsLength = responseData.orderProducts.length;
            let OtherProducts = "";

            if (ProductsLength > 1) {
              OtherProducts = `${responseData.orderProducts[0].name} 외${
                ProductsLength - 1
              } 개`;
            } else if (ProductsLength == 1) {
              OtherProducts = responseData.orderProducts[0].name;
            }

            const data: RequestPayParams = {
              pg: "html5_inicis.INIBillTst", // PG사 : https://portone.gitbook.io/docs/sdk/javascript-sdk/payrq#undefined-1 참고
              pay_method: "card", // 결제수단
              merchant_uid: `${responseData.orderNumber}`, // 주문번호
              amount: Number(`${responseData.totalAmount}`),
              name: OtherProducts,
              buyer_name: `${responseData.name}`, // 구매자 이름
              buyer_tel: `${responseData.phoneNumber}`, // 구매자 전화번호
              buyer_email: `${responseData.email}`, // 구매자 이메일
              buyer_addr: `${responseData.address} ${responseData.addressDetail}`,
            };
            IMP.request_pay(data, callback);
          }
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleOpenErrorModal(error.response?.data.message);
      }
    }
  };
  return (
    <Container maxWidth="xl">
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button
          onClick={onSubmitOrder}
          variant="contained"
          sx={{ marginBottom: "20px", marginRight: "20px" }}
        >
          구매하기
        </Button>
        <Button onClick={handleOpenConfirmation} sx={{ marginBottom: "20px" }}>
          <DeleteIcon />
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

      <ConfirmationDialog
        open={isConfirmationOpen}
        onClose={handleCloseConfirmation}
        onConfirm={handleDeleteAll}
        dialogTitle="삭제 확인"
        dialogContent="정말 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="닫기"
      />
      <ErrorModal
        open={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        errorMessage={errorMessage}
      />
    </Container>
  );
};

export default CartItems;
