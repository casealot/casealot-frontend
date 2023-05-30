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
import { emailState, passwordState } from "../atom/Signup";
import { useCallback, useState } from "react";
import { Modal } from "@mui/material";
import DaumPostcode from "react-daum-postcode";

const SignUpPage = () => {
  const [openPostcode, setOpenPostcode] = React.useState<boolean>(false);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useRecoilState(emailState);
  const [password, setPassword] = useRecoilState(passwordState);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);

      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage("영문 + 숫자 조합으로 8자리 이상 입력해주세요 😅");
        setIsPassword(false);
      } else {
        setPasswordMessage("안전한 비밀번호에요 😄");
        setIsPassword(true);
      }
    },
    []
  );
  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data: any) => {
      setAddress(data.address);
      setOpenPostcode(false);
    },
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

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="userId"
                label="아이디"
                name="id"
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
                error={!isPassword}
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="이름"
                name="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="nickname"
                label="닉네임"
                type="nickname"
                id="nickname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="nickname"
                label="휴대전화 번호"
                type="nickname"
                id="nickname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="nickname"
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
                name="nickname"
                label="주소2"
                type="nickname"
                id="nickname"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
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
  );
};

export default SignUpPage;
