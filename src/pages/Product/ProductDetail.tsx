import CssBaseline from "@mui/material/CssBaseline";
import { useParams } from "react-router";
import { useSetRecoilState } from "recoil";
import { CartListState } from "../../atom/Cart";
import { cartItems } from "../../atom/Cart";
import { api } from "../../atom/apiCall";
import { Box, Container } from "@mui/material";
import ready from "../../dummy/img/noimage.gif";
import ReviewForm from "../../components/Product/Review";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import ErrorModal from "../../components/Modal/ErrorHandleModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../components/Useable/Loading";
import { RequestPayParams, RequestPayResponse } from "../../atom/PortOne";
import ConfirmationDialog from "../../components/Modal/ConfirmModal";
import { useNavigate } from "react-router-dom";
import ReviewAccordion from "../../components/Product/ReviewAccordion";
import { Review } from "../../atom/Product";
import ProductDetailTop from "../../components/Product/ProductDetailTop";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const setCartItems = useSetRecoilState<cartItems[]>(CartListState);
  const [wishboolean, setWishboolean] = useState("");
  const [wishCountState, setWishCountState] = useState("");
  const [comment, setComment] = useState("");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const getProductDetail = useCallback(async () => {
    try {
      const response = await api.get(`cal/v1/product/${id}`);
      const productDetail = response.data.body;
      setWishboolean(productDetail.product.wishYn);
      setWishCountState(productDetail.product.wishCount);
      return productDetail;
    } catch (error) {
      if (axios.isAxiosError(error))
        handleOpenErrorModal(error.response?.data.message);
    }
  }, [id]);

  const { data, isLoading, refetch } = useQuery(["productdetail", id], () =>
    api.get(`cal/v1/product/${id}`).then((response) => response.data.body)
  );
  const product = useMemo(() => data?.product || {}, [data]);
  const {
    name,
    price,
    content,
    thumbnail,
    wishCount,
    wishYn,
    sale,
    calculatePrice,
    rating,
    ratingCount,
  } = product;

  useEffect(() => {
    setWishboolean(wishYn);
    setWishCountState(wishCount);
  }, [wishYn, wishCount]);

  useEffect(() => {
    refetch();
  }, [id]);
  const handleOpenErrorModal = (errorMessage: string) => {
    setErrorMessage(errorMessage);
    setIsErrorModalOpen(true);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  //---------------카트 관련함수---------------//
  const handleAddToCart = useCallback(async () => {
    try {
      const response = await api.post(`cal/v1/cart/items/${id}/${quantity}`);
      setCartItems(response.data.body.cart.products);
      setIsConfirmationOpen(true);
    } catch (error) {
      if (axios.isAxiosError(error))
        handleOpenErrorModal(error.response?.data.message);
    }
  }, [id, setCartItems, quantity]);

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handlelocateCart = () => {
    navigate("/cart");
  };

  //---------------위시리스트 관련 함수---------------//
  const handleWishAdd = useCallback(async () => {
    try {
      await api.post(`cal/v1/wishlist/${id}`);
      await getProductDetail();
    } catch (error) {
      if (axios.isAxiosError(error))
        handleOpenErrorModal(error.response?.data.message);
    }
  }, [id, getProductDetail]);

  const handleWishRemove = useCallback(async () => {
    try {
      await api.delete(`cal/v1/wishlist/${id}`);
      await getProductDetail();
    } catch (error) {
      if (axios.isAxiosError(error))
        handleOpenErrorModal(error.response?.data.message);
    }
  }, [id, getProductDetail]);

  //---------------결제 관련 함수---------------//
  const onSubmitOrder = async () => {
    try {
      const response = await api.post("cal/v1/order", {
        orderProducts: [{ productId: id, quantity: quantity }],
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
              pg: "html5_inicis.INIBillTst",
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

  const callback = async (response: RequestPayResponse) => {
    const { success, error_msg } = response;

    if (success) {
      alert("결제 성공");

      const res = await api.put(
        `/cal/v1/verifyIamport/${response.merchant_uid}`,
        `${response.imp_uid}`,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      if (res) {
        await api.post(`cal/v1/order/${res.data.orderId}/directComplete`);
      }
      console.log(response);
      console.log(response.imp_uid);
      console.log(response.merchant_uid);
      setCartItems([]);
    } else {
      handleOpenErrorModal(error_msg);
    }
  };

  // ---------------리뷰 관련 함수--------------- //
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const addReviewCommentMutation = useMutation(
    async (commentData: { reviewCommentText: string; commentId: number }) => {
      const response = await api.post(
        `/cal/v1/review/comment/${commentData.commentId}`,
        commentData
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["productdetail"]);
      },
    }
  );

  const handleCommentSubmit = useCallback(
    async (commentId: number) => {
      try {
        await addReviewCommentMutation.mutateAsync({
          reviewCommentText: comment,
          commentId: commentId,
        });
      } catch (error) {
        if (axios.isAxiosError(error))
          handleOpenErrorModal(error.response?.data.message);
      }
    },
    [addReviewCommentMutation, comment]
  );

  const addReviewMutation = useMutation(
    async (reviewData: { rating: number; reviewText: string }) => {
      const response = await api.post(`/cal/v1/review/${id}`, reviewData);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["productdetail"]);
      },
    }
  );

  const handleReviewSubmit = useCallback(
    async (rating: number, comment: string): Promise<void> => {
      try {
        await addReviewMutation.mutateAsync({ rating, reviewText: comment });
      } catch (error) {
        if (axios.isAxiosError(error))
          handleOpenErrorModal(error.response?.data.message);
      }
    },
    [addReviewMutation]
  );

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <CssBaseline />

      <ProductDetailTop
        thumbnailUrl={thumbnail ? thumbnail.url : ready}
        name={name}
        price={price}
        sale={sale}
        calculatePrice={calculatePrice}
        quantity={quantity}
        setQuantity={setQuantity}
        rating={rating}
        ratingCount={ratingCount}
        wishboolean={wishboolean}
        wishCountState={wishCountState}
        handleWishAdd={handleWishAdd}
        handleWishRemove={handleWishRemove}
        handleAddToCart={handleAddToCart}
        onSubmitOrder={onSubmitOrder}
      />

      <Container maxWidth="lg">
        <div
          style={{
            justifyContent: "center",
            borderBottom: "1px solid #d3d3d3",
            borderTop: "1px solid #d3d3d3",
            minHeight: "500px",
            padding: "50px",
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        <Box
          sx={{
            width: "100%",
            border: "1px solid #d3d3d3",
            textAlign: "left",
            marginTop: "80px",
          }}
        >
          {data.reviewList.map((item: Review, index: number) => (
            <ReviewAccordion
              key={index}
              review={item}
              onCommentSubmit={handleCommentSubmit}
              onCommentChange={handleCommentChange}
            />
          ))}
        </Box>
        <ReviewForm onSubmit={handleReviewSubmit} />
      </Container>

      <ErrorModal
        open={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        errorMessage={errorMessage}
      />
      <ConfirmationDialog
        open={isConfirmationOpen}
        onClose={handleCloseConfirmation}
        onConfirm={handlelocateCart}
        dialogTitle="장바구니"
        dialogContent="장바구니로 이동 하시겠습니까?"
        confirmText="이동"
        cancelText="닫기"
      />
    </>
  );
};

export default ProductDetail;
