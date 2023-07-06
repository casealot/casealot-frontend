import { useEffect, useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../atom/apiCall";
import ErrorModal from "../../components/Modal/ErrorHandleModal";
import axios from "axios";
import ConfirmationDialog from "../../components/Modal/ConfirmModal";

const QnAFix = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { id } = useParams<{ id: string }>();

  const getQnaList = async () => {
    try {
      const response = await api.get(`/cal/v1/qna/list/${id}`);
      const res = response.data.body.qna;
      setTitle(res.title);
      setContent(res.content);

      return res;
    } catch (error) {
      if (axios.isAxiosError(error))
        handleOpenErrorModal(error.response?.data.message);
    }
  };
  useEffect(() => {
    getQnaList();
  }, []);

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
  const handleOpenConfirmation = () => {
    setIsConfirmationOpen(true);
  };
  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleSubmit = async () => {
    try {
      await api.put(`cal/v1/qna/${id}`, {
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
          <Button variant="contained" onClick={handleOpenConfirmation}>
            수정하기
          </Button>
        </div>
        <ConfirmationDialog
          open={isConfirmationOpen}
          onClose={handleCloseConfirmation}
          onConfirm={handleSubmit}
          dialogTitle="수정 확인"
          dialogContent="정말로 수정하시겠습니까?"
          confirmText="수정"
          cancelText="닫기"
        />
      </Container>
      <ErrorModal
        open={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default QnAFix;
