import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  Modal,
} from "@mui/material";
import { styled } from "styled-components";
import DaumPostcode from "react-daum-postcode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const EditProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [openPostcode, setOpenPostcode] = React.useState<boolean>(false);
  const [address, setAddress] = useState("");
  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // 여기에 회원 정보 수정을 처리하는 로직을 추가하세요.
    console.log("수정된 회원 정보:", { firstName, lastName, email });
    // 수정된 회원 정보를 서버에 보내거나 필요한 작업을 수행하세요.
  };

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
  }; // 스타일 정의 code
  const FormFlex = styled.div`
    display: flex;
    justify-content: start;
    border-top: 1px solid #dfdfdf;
    padding: 10px 0;
  `;

  const FormText = styled.span`
    margin: auto 0;
    padding: 15px 0 15px 18px;
    width: 132px;
  `;

  return (
    <>
      <Container maxWidth="lg">
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="blue"
          gutterBottom
          paddingTop={10}
          sx={{ margin: "20px 0" }}
        >
          EDIT PROFILE
        </Typography>
        <AccountCircleIcon
          sx={{
            width: "8em",
            height: "8em",
            color: "#808080",
            marginY: "20px",
          }}
        />
        <Typography
          component="h6"
          sx={{ fontWeight: "600", marginLeft: "24px", marginTop: "100px" }}
          align="left"
        >
          기본정보
        </Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              m: 1,
            },
            padding: "24px",
            paddingTop: "5px",
            marginBottom: "24px",
          }}
          noValidate
          autoComplete="off"
        >
          <FormFlex>
            <FormText>아이디</FormText>
            <TextField
              required
              id="standard-required"
              label="ID"
              defaultValue="Hello World"
            />
          </FormFlex>
          <FormFlex>
            <FormText>이메일</FormText>
            <TextField
              required
              id="standard-required"
              label="이메일"
              defaultValue="jaeyoon1222@gmail.com"
              sx={{ maxWidth: "fit-content" }}
            />
          </FormFlex>
          <FormFlex>
            <FormText> 비밀번호 </FormText>
            <TextField
              disabled
              id="standard-disabled"
              label="Disabled"
              defaultValue="********"
            />
          </FormFlex>
          <FormFlex>
            <FormText>이름</FormText>
            <TextField
              required
              id="standard-required"
              label="이름"
              defaultValue="김재윤"
            />
          </FormFlex>
          <FormFlex>
            <FormText>휴대전화</FormText>
            <TextField
              required
              id="standard-required"
              label="휴대전화"
              defaultValue="01012345678"
            />
          </FormFlex>
          <FormFlex>
            <FormText>주소1</FormText>
            <TextField
              required
              id="standard-required"
              label="주소1"
              defaultValue="경기 성남시 분당구 판교역로 166"
              value={address}
              sx={{ width: "33%" }}
            />
            <Button onClick={handle.clickButton}>주소찾기</Button>
          </FormFlex>
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
          <FormFlex>
            <FormText>주소2</FormText>
            <TextField
              required
              id="standard-required"
              label="주소2"
              defaultValue="0동 000호"
              placeholder="0동 000호"
              sx={{ width: "33%" }}
            />
          </FormFlex>

          <Typography
            component="h6"
            sx={{ fontWeight: "600", marginTop: "100px", marginBottom: "5px" }}
            align="left"
          >
            추가정보
          </Typography>

          <FormFlex>
            <FormText>생년월일</FormText>
            <TextField
              required
              id="standard-required"
              label="생년월일"
              placeholder="ex)200120"
            />
          </FormFlex>
          <FormFlex>
            <FormText>성별</FormText>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              sx={{ marginLeft: "8px" }}
            >
              <FormControlLabel value="남자" control={<Radio />} label="남자" />
              <FormControlLabel value="여자" control={<Radio />} label="여자" />
            </RadioGroup>
          </FormFlex>
          <FormFlex
            style={{
              marginTop: "90px",
              borderTop: "none",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
            >
              수정하기
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
            >
              취소하기
            </Button>
          </FormFlex>
        </Box>
      </Container>
    </>
  );
};

export default EditProfile;
