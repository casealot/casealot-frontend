import { useQuery } from "@tanstack/react-query";
import { api } from "../../atom/apiCall";
import Loading from "../Useable/Loading";
import ready from "../../dummy/img/noimage.gif";
import { Box, Typography } from "@mui/material";
import { styled } from "styled-components";

type QnAList = {
  id: number;
  title: string;
  modifiedDt: string;
  profileImg: string | null;
  customerId: string;
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

const TitleTypography = styled(Typography)`
  max-width: 400px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 600;
`;
const QnABoard = () => {
  const getQnA = async () => {
    try {
      const response = await api.get("cal/v1/function/qna");
      return response.data.body.function;
    } catch (error) {
      console.log(error);
    }
  };

  const { data: QnA, isLoading } = useQuery(["getQnA"], getQnA);

  return isLoading ? (
    <Loading />
  ) : (
    <Box sx={{ marginTop: "60px" }}>
      {QnA?.map((qnaList: QnAList, index: number) => (
        <div key={index} style={{ display: "flex", padding: "8px" }}>
          <ImageContainer style={{ marginRight: "10px" }}>
            {qnaList.profileImg ? (
              <StyledImage src={qnaList.profileImg} alt="Profile" />
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
            <Typography
              sx={{ fontSize: "12px", color: "blue", marginBottom: "2px" }}
            >
              {qnaList.customerId}님
            </Typography>
            <TitleTypography>{qnaList.title}</TitleTypography>
          </div>
          <Typography sx={{ marginLeft: "auto", fontSize: "10px" }}>
            {qnaList.modifiedDt}
          </Typography>
        </div>
      ))}
    </Box>
  );
};

export default QnABoard;
