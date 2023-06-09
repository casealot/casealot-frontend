import { useQuery } from "@tanstack/react-query";
import { api } from "../../atom/apiCall";
import Loading from "../Useable/Loading";
import ready from "../../dummy/img/noimage.gif";
import { Box, Typography } from "@mui/material";
import { styled } from "styled-components";
import { NoneStyledLink } from "../Useable/Link";

type ReviewList = {
  id: number;
  reviewText: string;
  modifiedDt: string;
  productThumbnail: string | null;
  customerId: string;
  productName: string;
  productId: number;
};

const ImageContainer = styled.div`
  width: 50px;
  height: 50px;
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ReviewBoard = () => {
  const getReview = async () => {
    try {
      const response = await api.get("cal/v1/function/review");
      return response.data.body.function;
    } catch (error) {
      console.log(error);
    }
  };

  const { data: Review, isLoading } = useQuery(["getReivew"], getReview);

  return isLoading ? (
    <Loading />
  ) : (
    <Box sx={{ marginTop: "60px" }}>
      {Review?.map((ReviewList: ReviewList, index: number) => (
        <NoneStyledLink to={`/products/${ReviewList.productId}`}>
          <div key={index} style={{ display: "flex", padding: "8px" }}>
            <ImageContainer style={{ marginRight: "10px" }}>
              {ReviewList.productThumbnail ? (
                <StyledImage src={ReviewList.productThumbnail} alt="Profile" />
              ) : (
                <StyledImage src={ready} alt="Placeholder" />
              )}
            </ImageContainer>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "auto 0",
              }}
            >
              <div style={{ display: "flex" }}>
                <Typography
                  sx={{
                    fontSize: "12px",
                    marginBottom: "2px",
                    color: "#000",
                  }}
                >
                  {ReviewList.customerId}님
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    marginBottom: "2px",
                    color: "#000",
                    fontWeight: 600,
                    marginLeft: "6px",
                  }}
                >
                  [ {ReviewList.productName} ]
                </Typography>
              </div>
              <Typography>{ReviewList.reviewText}</Typography>
            </div>
            <Typography sx={{ marginLeft: "auto", fontSize: "10px" }}>
              {ReviewList.modifiedDt}
            </Typography>
          </div>
        </NoneStyledLink>
      ))}
    </Box>
  );
};

export default ReviewBoard;
