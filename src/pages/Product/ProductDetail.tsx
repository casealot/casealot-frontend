import CssBaseline from "@mui/material/CssBaseline";
import { useParams } from "react-router";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/material/Button";
import { CartListState } from "../../atom/Cart";
import { cartItems } from "../../atom/Cart";
import { api } from "../../atom/apiCall";
import {
  Box,
  Container,
  FormControl,
  OutlinedInput,
  Rating,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
} from "@mui/material";
import ready from "../../dummy/img/noimage.gif";
import ReviewForm from "../../components/Product/Review";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import ErrorModal from "../../components/Modal/ErrorHandleModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../components/Useable/Loading";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { RequestPayParams, RequestPayResponse } from "../../atom/PortOne";
import ConfirmationDialog from "../../components/Modal/ConfirmModal";
import { useNavigate } from "react-router-dom";

const DetailTop = styled.div`
  width: 1180px;
  margin: 0 auto;
  margin-top: 80px;
  display: flex;

  margin-bottom: 50px;
`;
const DetailBottom = styled.div`
  width: 1180px;
  margin: 0 auto;
  display: flex;
`;
const ThumbNail = styled.img`
  position: relative;
  width: 600px;
  height: 600px;
  padding-left: 50px;
  margin-right: auto;
  transform: scale(0.8);
`;

const DetailTitle = styled.h1`
  margin: 19px 0 9px;
  font-size: 27px;
  font-weight: 500;
  font-family: "ssgBan", sans-serif;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-break: keep-all;
  word-wrap: break-word;
  white-space: normal;
`;
const DetailRightTop = styled.div`
  position: relative;
  padding-bottom: 17px;
  border-bottom: 1px solid #222;
`;

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [, setReviewList] = useRecoilState<Review[]>(ReviewListAtom);
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
    } catch (error: any) {
      console.log(error);
    }
  }, [id]);

  const { data, isLoading } = useQuery(["productdetail"], () =>
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
    getProductDetail();
  }, []);
  useEffect(() => {
    setWishboolean(wishYn);
    setWishCountState(wishCount);
  }, [wishYn, wishCount]);

  const handleAddToCart = useCallback(async () => {
    try {
      const response = await api.post(`cal/v1/cart/items/${id}/${quantity}`);
      setCartItems(response.data.body.cart.products);
      setIsConfirmationOpen(true);
    } catch (error) {
      if (axios.isAxiosError(error))
        handleOpenErrorModal(error.response?.data.message);
    }
  }, [id, setCartItems, setQuantity, quantity]);

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
    []
  );

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

  const handleOpenErrorModal = (errorMessage: string) => {
    setErrorMessage(errorMessage);
    setIsErrorModalOpen(true);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

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
    [comment]
  );
  // console.log(cartItems);

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

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handlelocateCart = () => {
    navigate("/cart");
  };

  console.log(quantity);
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <CssBaseline />

      <DetailTop>
        {thumbnail ? (
          <ThumbNail src={thumbnail.url} />
        ) : (
          <ThumbNail src={ready} />
        )}

        <div style={{ width: "470px", textAlign: "left", paddingTop: "20px" }}>
          <DetailRightTop>
            <div style={{ display: "flex", borderBottom: "1px solid #d3d3d3" }}>
              <DetailTitle>{name}</DetailTitle>
            </div>
            <div
              style={{
                marginTop: "27px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                borderBottom: "1px solid #d3d3d3",
                paddingBottom: "20px",
              }}
            >
              <div style={{ display: "flex" }}>
                <span
                  style={{
                    fontSize: "16px",
                    marginRight: "30px",
                    width: "33%",
                  }}
                >
                  판매가
                </span>
                <span
                  style={{
                    fontSize: "16px",
                    marginLeft: "auto",
                  }}
                >
                  {price}원
                </span>
              </div>

              <div style={{ display: "flex" }}>
                <span
                  style={{
                    fontSize: "16px",
                    marginRight: "30px",
                    width: "33%",
                  }}
                >
                  할인율
                </span>
                <span
                  style={{
                    fontSize: "16px",
                    marginLeft: "auto",
                    color: "#808080",
                  }}
                >
                  {sale} %
                </span>
              </div>
              <div style={{ display: "flex" }}>
                <span
                  style={{
                    fontSize: "16px",
                    marginRight: "30px",
                    width: "33%",
                  }}
                >
                  할인판매가
                </span>
                <span
                  style={{
                    fontSize: "16px",
                    marginLeft: "auto",
                    fontWeight: "bold",
                  }}
                >
                  {calculatePrice}원
                </span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                marginTop: "20px",
                maxHeight: "30px",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  marginRight: "30px",
                }}
              >
                {name}
              </span>
              <span
                style={{
                  fontSize: "16px",
                  marginRight: "30px",
                  marginLeft: "auto",
                }}
              >
                <TextField
                  value={quantity}
                  onChange={(event) => setQuantity(Number(event.target.value))}
                  type="number"
                  inputProps={{
                    min: 1,
                    max: 50, // Set the maximum allowed quantity here
                    style: {
                      padding: "4px", // Adjust the padding value as needed
                      fontSize: "12px", // Adjust the font size as needed
                      maxWidth: "30px",
                    },
                  }}
                />{" "}
                개
              </span>
              <span
                style={{
                  fontSize: "16px",
                  marginLeft: "auto",
                }}
              >
                {price * quantity}원
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                color: "#808080",
                maxHeight: "30px",
                borderBottom: "1px solid #d3d3d3",
                paddingBottom: "30px",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  marginLeft: "auto",
                }}
              >
                -{price * quantity - calculatePrice * quantity}원
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                marginTop: "20px",
                maxHeight: "30px",
              }}
            >
              <span
                style={{
                  fontSize: "16px",
                  marginLeft: "auto",
                }}
              >
                TOTAL : {calculatePrice * quantity}원
              </span>
            </div>
          </DetailRightTop>
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
      </DetailTop>

      <DetailBottom>
        <Container maxWidth="xl">
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
            {data.reviewList.map((item: any, index: number) => {
              return (
                <>
                  {/* <-- Accordion 추가 */}

                  <Accordion key={index}>
                    <div style={{ paddingLeft: "10px" }}>
                      <AccordionSummary>
                        <Typography variant="h5">
                          {item.customerName}
                        </Typography>
                        <Rating
                          name="read-only"
                          value={item.rating}
                          readOnly
                          sx={{ paddingLeft: "8px", paddingTop: "2px" }}
                        />
                        <Typography
                          sx={{
                            marginLeft: "10px",
                            fontWeight: "500",
                            marginTop: "2px",
                          }}
                        >
                          {item.reviewText}
                        </Typography>
                        <Typography
                          sx={{ fontSize: "12px", marginLeft: "auto" }}
                        >
                          작성시간 : {item.createdDt}
                        </Typography>
                      </AccordionSummary>
                    </div>
                    <AccordionDetails>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          {item.reviewCommentList &&
                            item.reviewCommentList.map(
                              (reviewComment: any, index: number) => (
                                <div
                                  key={index}
                                  style={{
                                    display: "flex",
                                    marginBottom: "5px",
                                    paddingLeft: "10px",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      marginRight: "3px",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {reviewComment.customerName}님
                                  </Typography>
                                  <Typography>
                                    {" "}
                                    - {reviewComment.reviewCommentText}
                                  </Typography>
                                </div>
                              )
                            )}
                        </div>
                        <div>
                          <FormControl
                            sx={{
                              width: "90%",
                              marginY: "10px",
                            }}
                          >
                            <OutlinedInput
                              onChange={handleCommentChange}
                              placeholder="댓글을 입력하세요"
                            />
                          </FormControl>
                          <Button
                            variant="contained"
                            sx={{
                              marginLeft: "10px",
                              marginTop: "20px",
                              height: "fit-content",
                            }}
                            onClick={() => handleCommentSubmit(item.id)}
                          >
                            등록
                          </Button>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </>
              );
            })}
          </Box>
          <ReviewForm onSubmit={handleReviewSubmit} />
        </Container>
      </DetailBottom>

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
