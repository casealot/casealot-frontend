import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Modal,
  Avatar,
} from "@mui/material";
import { styled } from "styled-components";
import DaumPostcode from "react-daum-postcode";

import { api } from "../../atom/apiCall";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../components/Modal/ConfirmModal";
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

const EditProfile = () => {
  const [idState, setIdState] = useState("");
  const [nameState, setNameState] = useState("");
  const [emailState, setEmailState] = useState("");
  const [phoneNumberState, setPhoneNumberState] = useState("");
  const [openPostcode, setOpenPostcode] = React.useState<boolean>(false);
  const [addressState, setAddressState] = useState("");
  const [address2State, setAddress2State] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState("");
  const [, setIsErrorModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const navigate = useNavigate();
  // const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [, setErrorMessage] = useState("");

  const queryClient = useQueryClient();

  const handleChangeProfileImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNameState(event.target.value);
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumberState(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailState(event.target.value);
  };
  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddressState(event.target.value);
  };
  const handleAddress2Change = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress2State(event.target.value);
  };
  const handleOpenErrorModal = (errorMessage: string) => {
    setErrorMessage(errorMessage);
    setIsErrorModalOpen(true);
  };
  // const handleCloseErrorModal = () => {
  //   setIsErrorModalOpen(false);
  // };

  const { data: userInfo } = useQuery(
    ["userInfo"],
    () => api.get("cal/v1/customer"),
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (userInfo) {
      const res = userInfo.data.body.customer;
      setNameState(res.name);
      setEmailState(res.email);
      setAddressState(res.address);
      setAddress2State(res.addressDetail);
      setIdState(res.id);
      setPhoneNumberState(res.phoneNumber);
      setProfilePreview(res.profileImageUrl);
    }
  }, [userInfo]);

  const updateUserInfo = async () => {
    const formData = new FormData();
    if (profileImage) {
      formData.append("profile", profileImage); // 썸네일 이미지 파일 추가
    }

    const updatedUserInfo = {
      address: addressState,
      addressDetail: address2State,
      email: emailState,
      name: nameState,
      phoneNumber: phoneNumberState,
    };

    try {
      const response = await api.put("cal/v1/customer/update", updatedUserInfo);
      if (response) {
        const customerId = response.data.body.customer.id;
        const res = await api.put(
          `cal/v1/file/${customerId}/customer/image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res) {
          navigate("/mypage");
        }
      }

      queryClient.invalidateQueries(["userInfo"]);
    } catch (error) {
      if (axios.isAxiosError(error))
        handleOpenErrorModal(error.response?.data.message);
    }
  };

  const mutation = useMutation(updateUserInfo);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    mutation.mutate();
  };

  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },

    // 주소 선택 이벤트
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectAddress: (data: any) => {
      setAddressState(data.address);
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

  const handleOpenConfirmation = () => {
    setIsConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleQuit = async () => {
    const response = await api.delete("/cal/v1/customer/quit");
    if (response) {
      navigate("/");
    }
  };
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
        <label htmlFor="profile-image-upload">
          <input
            id="profile-image-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChangeProfileImage}
          />
          {profilePreview ? (
            <Avatar
              src={profilePreview}
              sx={{
                width: "8em",
                height: "8em",
                margin: "0 auto",
                cursor: "pointer",
              }}
            />
          ) : (
            <Avatar
              src="/static/images/avatar/1.jpg"
              sx={{
                width: "8em",
                height: "8em",
                margin: "0 auto",
                cursor: "pointer",
              }}
            />
          )}
        </label>
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
              id="standard-disabled"
              value={idState}
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
              value={emailState}
              sx={{ maxWidth: "fit-content" }}
              onChange={handleEmailChange}
            />
          </FormFlex>
          <FormFlex>
            <FormText> 비밀번호 </FormText>
            <TextField
              disabled
              id="standard-disabled"
              label="비밀번호"
              defaultValue="********"
            />
          </FormFlex>
          <FormFlex>
            <FormText>이름</FormText>
            <TextField
              required
              id="standard-required"
              label="이름"
              value={nameState}
              onChange={handleNameChange}
            />
          </FormFlex>
          <FormFlex>
            <FormText>휴대전화</FormText>
            <TextField
              required
              id="standard-required"
              label="휴대전화"
              value={phoneNumberState}
              onChange={handlePhoneChange}
            />
          </FormFlex>
          <FormFlex>
            <FormText>주소1</FormText>
            <TextField
              required
              id="standard-required"
              label="주소1"
              defaultValue="경기 성남시 분당구 판교역로 166"
              value={addressState}
              onChange={handleAddressChange}
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
              value={address2State}
              placeholder="0동 000호"
              sx={{ width: "33%" }}
              onChange={handleAddress2Change}
            />
          </FormFlex>

          <Typography
            component="h6"
            sx={{ fontWeight: "600", marginTop: "100px", marginBottom: "5px" }}
            align="left"
          >
            회원탈퇴
          </Typography>

          <FormFlex>
            <Button sx={{ marginX: "auto" }} onClick={handleOpenConfirmation}>
              탈퇴하기
            </Button>
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
              onClick={() => navigate("/mypage")}
            >
              취소하기
            </Button>
          </FormFlex>
        </Box>
      </Container>
      <ConfirmationDialog
        open={isConfirmationOpen}
        onClose={handleCloseConfirmation}
        onConfirm={handleQuit}
        dialogTitle="탈퇴 확인"
        dialogContent="정말 탈퇴하시겠습니까?"
        confirmText="탈퇴"
        cancelText="취소"
      />
    </>
  );
};

export default EditProfile;
