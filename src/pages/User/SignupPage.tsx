import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRecoilState } from "recoil";

import { passwordState } from "../../atom/Signup";
import { useCallback, useState } from "react";
import { Modal } from "@mui/material";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";
import ErrorModal from "../../components/Modal/ErrorHandleModal";
import { useNavigate } from "react-router";

const SignUpPage = () => {
  const [openPostcode, setOpenPostcode] = React.useState<boolean>(false);
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [password, setPassword] = useRecoilState(passwordState);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberMessage, setPhoneNumberMessage] = useState("");
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [name, setName] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `https://casealot.shop/cal/v1/customer/join`,
        {
          address: address,
          addressDetail: address2,
          email: email,
          id: username,
          name: name,
          password: password,
          profileImageUrl: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:5173",
          },
        }
      );
      if (response) navigate("/signin");
      alert("회원가입에 성공하였습니다.");
    } catch (error) {
      if (axios.isAxiosError(error))
        handleOpenErrorModal(error.response?.data.message);
    }
  };
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const phoneNumberRegex = /^\d{10,}$/;

  const onChangeUsername = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const username = e.target.value;
      setUsername(username);

      if (username.length < 5) {
        setUsernameMessage("아이디는 최소 5글자 이상이어야 합니다.");
      } else {
        setUsernameMessage("");
      }
    },
    []
  );

  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const emailValue = e.target.value;
      setEmail(emailValue);

      if (!emailRegex.test(emailValue)) {
        setEmailMessage("올바른 이메일 주소 형식이 아닙니다.");
      } else {
        setEmailMessage("");
      }
    },
    []
  );

  const onChangePhoneNumber = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const phoneNumberValue = e.target.value;
      setPhoneNumber(phoneNumberValue);

      if (!phoneNumberRegex.test(phoneNumberValue)) {
        setPhoneNumberMessage(
          "올바른 핸드폰 번호 형식이 아닙니다. - 없이 입력해주세요"
        );
      } else {
        setPhoneNumberMessage("");
      }
    },
    []
  );

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);

      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage("영문 + 숫자 조합으로 8자리 이상 입력해주세요 😅");
      } else {
        setPasswordMessage("");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },

    // 주소 선택 이벤트
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectAddress: (data: any) => {
      setAddress(data.address);
      setOpenPostcode(false);
    },
  };

  const handleOpenErrorModal = (errorMessage: string) => {
    setErrorMessage(errorMessage);
    setIsErrorModalOpen(true);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const postCodeStyle = {
    width: "500px",
    height: "500px",
    margin: "auto",
    marginTop: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ marginBottom: "160px" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userId"
                  label="아이디"
                  name="id"
                  type="id"
                  value={username}
                  onChange={onChangeUsername}
                  error={Boolean(usernameMessage)}
                  helperText={usernameMessage}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="비밀번호"
                  name="password"
                  type="password"
                  value={password}
                  onChange={onChangePassword}
                  error={Boolean(passwordMessage)}
                  helperText={passwordMessage}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="이메일 주소"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  error={Boolean(emailMessage)}
                  helperText={emailMessage}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="이름"
                  name="username"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="휴대전화 번호"
                  type="text"
                  id="phoneNumber"
                  placeholder="01012341234"
                  value={phoneNumber}
                  onChange={onChangePhoneNumber}
                  error={Boolean(phoneNumberMessage)}
                  helperText={phoneNumberMessage}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="주소1"
                  defaultValue="경기 성남시 분당구 판교역로 166"
                  value={address}
                  sx={{ width: "81%", marginRight: "auto" }}
                />

                <Button onClick={handle.clickButton} sx={{ marginY: "10px" }}>
                  주소찾기
                </Button>
              </Grid>
              <Modal
                open={openPostcode}
                onClose={() => setOpenPostcode(false)}
                aria-labelledby="address-search-modal"
                aria-describedby="address-search-modal-description"
              >
                <div style={postCodeStyle}>
                  <DaumPostcode
                    onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
                    autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                  />
                </div>
              </Modal>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address2"
                  label="주소2"
                  type="address2"
                  id="address2"
                  value={address2}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAddress2(e.target.value)
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={
                !passwordRegex.test(password) ||
                !emailRegex.test(email) ||
                !phoneNumberRegex.test(phoneNumber)
              }
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  이미 계정이 있으신가요?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <ErrorModal
        open={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default SignUpPage;
