import { TextField, Button, Container } from "@mui/material";
import { useState } from "react";
import { api } from "../../atom/apiCall";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AdminQnaReply = (qnaId: { id: string }) => {
  const [replyContent, setReplyContent] = useState("");

  const { id } = qnaId;
  const queryClient = useQueryClient();

  const handleReplySubmit = useMutation(async () => {
    try {
      await api.post(`cal/v1/admin/qna/${id}`, {
        content: replyContent,
      });
      queryClient.invalidateQueries(["QnADetail", id]);
      setReplyContent("");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Container maxWidth="md" sx={{ textAlign: "right" }}>
        <TextField
          label="Reply"
          multiline
          rows={4}
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          fullWidth
          sx={{ marginTop: "20px" }}
        />
        <Button
          variant="contained"
          onClick={() => handleReplySubmit.mutate()}
          sx={{ marginY: "30px", placeItems: "end" }}
        >
          답변하기
        </Button>
      </Container>
    </>
  );
};

export default AdminQnaReply;
