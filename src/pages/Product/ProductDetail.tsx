import CssBaseline from "@mui/material/CssBaseline";
import { useParams } from "react-router";
import { Review, ReviewListAtom } from "../../atom/Product";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
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
} from "@mui/material";
import ready from "../../dummy/img/noimage.gif";
import ReviewForm from "../../components/Product/Review";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import ErrorModal from "../../components/Modal/ErrorHandleModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../components/Useable/Loading";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
  const [, setReviewList] = useRecoilState<Review[]>(ReviewListAtom);
  const setCartItems = useSetRecoilState<cartItems[]>(CartListState);
  const [wishboolean, setWishboolean] = useState("");
  const [wishCountState, setWishCountState] = useState("");
  const [comment, setComment] = useState("");

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

  const { data, isLoading } = useQuery(["productdetail"], getProductDetail, {});
  const product = useMemo(() => data?.product || {}, [data]);
  const { name, price, content, thumbnail, wishCount, wishYn } = product;

  useEffect(() => {
    getProductDetail();
  }, []);
  useEffect(() => {
    setWishboolean(wishYn);
    setWishCountState(wishCount);
  }, [wishYn, wishCount]);

  const handleAddToCart = useCallback(async () => {
    try {
      const response = await api.post(`cal/v1/cart/items/${id}`);
      setCartItems(response.data.body.cart.products);
    } catch (error) {
      if (axios.isAxiosError(error))
        handleOpenErrorModal(error.response?.data.message);
    }
  }, [id, setCartItems]);

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
            <DetailTitle>{name}</DetailTitle>
            <div
              style={{
                marginTop: "27px",
                display: "flex",
              }}
            >
              <span
                style={{
                  fontSize: "23px",
                  fontWeight: "500",
                  marginRight: "auto",
                }}
              >
                {price}원
              </span>
              {wishboolean === "N" ? (
                <Button
                  style={{
                    alignItems: "right",
                    fontSize: "23px",
                    verticalAlign: "baseline",
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
          </DetailRightTop>
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
            >
              바로구매
            </Button>
          </div>
        </div>
      </DetailTop>

      <DetailBottom>
        <Container>
          <div
            style={{
              display: "flex",
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
    </>
  );
};

export default ProductDetail;
