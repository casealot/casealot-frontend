import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { api } from "../../atom/apiCall";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ErrorModal from "../../components/Modal/ErrorHandleModal";
import { NoneStyledLink } from "../../components/Useable/Link";

const defaultTheme = createTheme();

const SigninPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await api.post(
        `/cal/v1/customer/login`,
        {
          id: userId,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      localStorage.setItem(
        "accessToken",
        response.data.body.customerToken.accessToken
      );
      localStorage.setItem(
        "refreshToken",
        response.data.body.customerToken.refreshToken
      );

      localStorage.setItem("role", response.data.body.customerToken.roleType);
      navigate("/");
      location.reload();
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error))
        handleOpenErrorModal(error.response?.data.message);
    }
  };

  const handleOpenErrorModal = (errorMessage: string) => {
    setErrorMessage(errorMessage);
    setIsErrorModalOpen(true);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{ maxHeight: "xs", marginBottom: "160px" }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="이메일"
                name="email"
                autoComplete="email"
                autoFocus
                value={userId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserId(e.target.value)
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                로그인
              </Button>
              <Grid container>
                <Grid item xs>
                  <NoneStyledLink to="/">비밀번호 찾기</NoneStyledLink>
                </Grid>
                <Grid item>
                  <NoneStyledLink to="/signup">
                    {"계정이 아직 없으신가요?"}
                  </NoneStyledLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <ErrorModal
        open={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default SigninPage;
