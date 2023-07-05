import { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../../atom/apiCall";
import ErrorModal from "../../components/Modal/ErrorHandleModal";
import axios from "axios";

const QNAPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const navigate = useNavigate();

  const handleOpenErrorModal = (errorMessage: string) => {
    setErrorMessage(errorMessage);
    setIsErrorModalOpen(true);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = api.post("cal/v1/qna", {
        content: content,
        title: title,
      });
      navigate("/qna");
    } catch (error) {
      if (axios.isAxiosError(error))
        handleOpenErrorModal(error.response?.data.message);
    }
  };

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
      <ErrorModal
        open={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default QNAPost;
