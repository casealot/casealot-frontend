import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../atom/apiCall";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../components/Useable/Loading";
import {
  Container,
  Typography,
  Box,
  Divider,
  Button,
  List,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import AdminQnaReply from "../Admin/AdminQnaReply";
import { QnA } from "../../atom/QnA";

const QnaDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const roleType = localStorage.getItem("role");

  const queryClient = useQueryClient();
  const QnaDetail = async () => {
    const response = await api.get(`cal/v1/qna/list/${id}`);
    return response.data.body.qna;
  };

  const { data, isLoading } = useQuery<QnA>(["QnADetail", id], QnaDetail);

  const { content, createdDt, customerId, title, available } = data || {};

  const handleDeleteQNA = async () => {
    try {
      const response = await api.delete(`/cal/v1/qna/${id}`);
      if (response) {
        navigate("/qna");
        queryClient.invalidateQueries(["QnADetail", id]);
      }
    } catch (error) {
      alert("error");
    }
  };
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
        <div
          style={{
            display: "flex",
            marginTop: "20px",
            borderBottom: "1px solid #d3d3d3",
            paddingBottom: "20px",
          }}
        >
          {available === "Y" ? (
            <>
              <Button onClick={() => navigate(`/qna/fix/${id}`)}>
                수정하기
              </Button>
              <Button onClick={handleDeleteQNA}>삭제하기</Button>
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
        <List
          sx={{
            width: "100%",
          }}
        >
          {data?.qnaCommentList.map((item) => (
            <ListItem alignItems="flex-start" sx={{ padding: "none" }}>
              <ListItemAvatar>
                <Avatar
                  sx={{ bgcolor: "orange" }}
                  alt="ADMIN"
                  src="/broken-image.jpg"
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${item.customerId}`}
                secondary={
                  <div style={{ display: "flex" }}>
                    <Typography
                      sx={{
                        display: "inline",
                        padding: "none",
                      }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {item.content}
                    </Typography>
                    <Typography sx={{ marginLeft: "auto" }} variant="body2">
                      {item.modifiedDt}
                    </Typography>
                  </div>
                }
              />
            </ListItem>
          ))}
        </List>
      </Container>
      {roleType === "ADMIN" && id && <AdminQnaReply id={id} />}
    </>
  );
};

export default QnaDetail;
