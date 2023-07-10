import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../atom/apiCall";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import { NoticeDetailItem } from "../../atom/Notice";
import NoticeReply from "./NoticeReply";

const NoticeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedComment, setEditedComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const QnaDetail = async () => {
    const response = await api.get(`cal/v1/notice/list/${id}`);
    return response.data.body.notice;
  };

  const { data, isLoading, refetch } = useQuery<NoticeDetailItem>(
    ["NoticeList", id],
    QnaDetail
  );

  const { content, createdDt, customerId, title } = data || {};

  const handleDeleteQNA = async () => {
    try {
      const response = await api.delete(`/cal/v1/admin/notice/${id}`);
      if (response) {
        navigate("/notice");
        queryClient.invalidateQueries(["NoticeList", id]);
      }
    } catch (error) {
      alert("error");
    }
  };
  const handleDeleteComment = useMutation(
    async (commentId: number) => {
      await api.delete(`/cal/v1/notice/${commentId}`);
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const handleEditComment = (commentId: number) => {
    setEditingCommentId(commentId);
    const comment = data?.noticeCommentList.find(
      (item) => item.id === commentId
    );
    setEditedComment(comment?.content || "");
    setIsEditing(true);
  };

  const handleSaveEditedComment = async () => {
    if (!editingCommentId) return;

    try {
      await api.put(`/cal/v1/notice/${editingCommentId}`, {
        content: editedComment,
      });

      setEditingCommentId(null);
      setEditedComment("");
      setIsEditing(false);
      refetch();
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
          <Button onClick={() => navigate(`/admin/notice/fix/${id}`)}>
            수정하기
          </Button>
          <Button onClick={() => handleDeleteQNA()}>삭제하기</Button>
          <Button
            variant="contained"
            sx={{ marginLeft: "auto" }}
            onClick={() => navigate(-1)}
          >
            목록으로
          </Button>
        </div>
        <List sx={{ width: "100%" }}>
          {data?.noticeCommentList.map((item) => (
            <ListItem
              alignItems="flex-start"
              sx={{ padding: "none" }}
              key={item.id}
            >
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
                    {editingCommentId === item.id && isEditing ? (
                      <>
                        <TextField
                          type="text"
                          value={editedComment}
                          onChange={(e) => setEditedComment(e.target.value)}
                          sx={{ width: "100%" }}
                        />
                        <Button onClick={handleSaveEditedComment}>확인</Button>
                      </>
                    ) : (
                      <>
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
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: "auto",
                          }}
                        >
                          <Typography variant="body2">
                            {item.modifiedDt}
                          </Typography>
                          {item.available === "Y" ? (
                            <div style={{ display: "flex" }}>
                              <Button
                                onClick={() => handleEditComment(item.id)}
                              >
                                <EditIcon />
                              </Button>
                              <Button
                                onClick={() =>
                                  handleDeleteComment.mutate(item.id)
                                }
                              >
                                <CancelIcon />
                              </Button>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </>
                    )}
                  </div>
                }
              />
            </ListItem>
          ))}
        </List>
      </Container>
      {id && <NoticeReply id={id} />}
    </>
  );
};

export default NoticeDetail;
