import { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../atom/apiCall";

const QNAPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = api.post("cal/v1/qna", {
        content: content,
        title: title,
      });
    } catch (error) {
      console.error("Error creating the QNA:", error);
    }
    console.log("Title:", title);
    console.log("Content:", content);
  };
  const navigate = useNavigate();

  return (
    <>
      <Container maxWidth="lg" sx={{ minHeight: "880px" }}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="blue"
          gutterBottom
          paddingTop={10}
          sx={{ margin: "50px 0" }}
        >
          Q&A
        </Typography>

        <TextField
          label="제목"
          variant="outlined"
          fullWidth
          value={title}
          onChange={handleTitleChange}
          sx={{ marginBottom: "20px" }}
        />

        <TextField
          label="내용을 작성해주세요"
          variant="outlined"
          multiline
          rows={15}
          fullWidth
          value={content}
          onChange={handleContentChange}
          sx={{ marginBottom: "20px" }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={() => {
              navigate(-1);
            }}
            sx={{ marginRight: "5px" }}
          >
            돌아가기
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            등록하기
          </Button>
        </div>
      </Container>
    </>
  );
};

export default QNAPost;
