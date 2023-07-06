import { TextField, Button, Container } from "@mui/material";
import { useState } from "react";
import { api } from "../../atom/apiCall";

const AdminQnaReply = (qnaId: { id: string }) => {
  const [replyContent, setReplyContent] = useState("");

  const { id } = qnaId;

  const handleReplySubmit = async () => {
    const response = await api.post(`cal/v1/admin/qna/${id}`);
    console.log(response);
  };

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
          onClick={handleReplySubmit}
          sx={{ marginY: "30px", placeItems: "end" }}
        >
          답변하기
        </Button>
      </Container>
    </>
  );
};

export default AdminQnaReply;
