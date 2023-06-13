import { useNavigate, useParams } from "react-router-dom";
import { api } from "../atom/apiCall";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Useable/Loading";
import { Container, Typography, Box, Divider, Button } from "@mui/material";

const QnaDetail = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const QnaDetail = async () => {
    const response = await api.get(`cal/v1/qna/list/${id}`);
    return response.data.body.qna;
  };

  const { data, isLoading } = useQuery(["QnADetail"], QnaDetail);

  const { content, createdDt, customerId, modifiedDt, title, available } =
    data || {};

  const navigate = useNavigate();

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Container maxWidth="md" sx={{ marginTop: "50px", textAlign: "left" }}>
        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "4px",
            minHeight: "500px",
          }}
        >
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
          <Divider sx={{ marginBottom: "20px" }} />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle2">글 작성자: {customerId}</Typography>
            <Typography variant="subtitle2">작성일자 : {createdDt}</Typography>
          </Box>

          <Divider sx={{ margin: "20px 0" }} />
          <Typography variant="body1" gutterBottom>
            {content}
          </Typography>
        </Box>
        <div style={{ display: "flex", marginTop: "20px" }}>
          {available === "Y" ? (
            <>
              <Button onClick={() => navigate(`/qna/fix/${id}`)}>
                수정하기
              </Button>
              <Button>삭제하기</Button>
            </>
          ) : (
            ""
          )}
          <Button
            variant="contained"
            sx={{ marginLeft: "auto" }}
            onClick={() => navigate(-1)}
          >
            목록으로
          </Button>
        </div>
      </Container>
    </>
  );
};

export default QnaDetail;
