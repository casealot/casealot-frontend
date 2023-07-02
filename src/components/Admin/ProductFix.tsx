import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../atom/apiCall";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  InputLabel,
  Container,
  Typography,
} from "@mui/material";

import styled from "styled-components";
import axios from "axios";
import ErrorModal from "../Modal/ErrorHandleModal";

const ContentText = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 39px;
  font-weight: 600;
`;

const ProductFix = () => {
  const params = useParams();
  const quillRef = useRef<any>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [sale, setSale] = useState("");
  const [season, setSeason] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [thumbnail, setThumbnail] = useState<null | File>(null);
  const [thumbnailpre, setThumbnailpre] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const productId = params.id;
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const response = await api.get(`cal/v1/product/${productId}`);

      const res = response.data.body.product;

      setName(res.name);
      setPrice(res.price);
      setSale(res.sale);
      setSeason(res.season);
      setType(res.type);
      setColor(res.color);
      setContentValue(res.content);
      setThumbnail(res.thumbnail.url);
      setThumbnailpre(res.thumbnail.url);
    } catch (error) {
      if (axios.isAxiosError(error))
        handleOpenErrorModal(error.response?.data.message);
    }
  };

  useEffect(() => {
    getProduct(); // 서버에서 상품 데이터 가져오기

    if (quillRef.current) {
      quillRef.current.on("text-change", handleContentChange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const handleContentChange = () => {
    if (quillRef.current) {
      const content = quillRef.current.root.innerHTML;
      setContentValue(content);
    }
  };

  const handleColorChange = (event: SelectChangeEvent<string>) => {
    setColor(event.target.value as string);
  };

  const handleSaleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "" || /^[0-9]{1,2}$/.test(value)) {
      setSale(value);
    }
  };

  const handleSeasonChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSeason(event.target.value);
  };

  const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  const handleThumbnailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setThumbnailpre(URL.createObjectURL(file));
    }
  };

  const handleSave = async (event: FormEvent) => {
    try {
      event.preventDefault();

      const response = await api.put(`cal/v1/admin/product/${productId}`, {
        name: name,
        content: contentValue,
        color: color,
        price: price,
        sale: sale,
        season: season,
        type: type,
        // Add other fields to update
      });
      console.log(response); // 예시로 콘솔에 출력합니다.
      // ... 저장 후 다른 로직을 처리합니다.

      const id = response.data.body.product.id;

      if (thumbnail && id) {
        const formData = new FormData();
        formData.append("thumbnail", thumbnail);
        api.put(`/cal/v1/file/${id}/image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      navigate("/admin/product");
    } catch (error) {
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

  const modules = {
    toolbar: [
      //[{ 'font': [] }],
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ["clean"],
    ],
  };

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "1200px",
          marginBottom: "200px",
        }}
      >
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="blue"
          gutterBottom
          paddingTop={10}
          sx={{ margin: "50px 0" }}
        >
          ProductFix
        </Typography>
        <div style={{ width: "100%", height: "600px" }}>
          <form onSubmit={handleSave}>
            <ContentText style={{ display: "flex", alignItems: "center" }}>
              <span style={{ color: "red", marginRight: "5px" }}>*</span>
              <span style={{ marginRight: "10px" }}>상품이름 : </span>
              <TextField
                label="상품이름"
                value={name}
                onChange={handleTitleChange}
                margin="normal"
                sx={{ width: "90%" }}
              />
            </ContentText>
            <ContentText style={{ display: "flex" }}>
              <span style={{ color: "red", marginRight: "5px" }}>*</span>
              <span style={{ marginRight: "10px" }}>상품색상 : </span>
              <FormControl
                margin="normal"
                sx={{ width: "220px", marginRight: " auto" }}
              >
                <InputLabel id="demo-simple-select-label">Color</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Color"
                  value={color}
                  onChange={handleColorChange}
                >
                  <MenuItem value="빨강">빨강</MenuItem>
                  <MenuItem value="주황">주황</MenuItem>
                  <MenuItem value="노랑">노랑</MenuItem>
                  <MenuItem value="파랑">파랑</MenuItem>
                  <MenuItem value="핑크">핑크</MenuItem>
                  <MenuItem value="보라">보라</MenuItem>
                  <MenuItem value="검정">검정</MenuItem>
                  <MenuItem value="흰색">흰색</MenuItem>
                  <MenuItem value="하늘">하늘</MenuItem>
                  <MenuItem value="베이지">베이지</MenuItem>
                  <MenuItem value="그레이">그레이</MenuItem>
                  <MenuItem value="카키">카키</MenuItem>
                  <MenuItem value="네이비">네이비</MenuItem>
                  <MenuItem value="기타">기타</MenuItem>
                </Select>
              </FormControl>
            </ContentText>
            <ContentText>
              <span style={{ color: "red", marginRight: "5px" }}>*</span>
              <span style={{ marginRight: "10px" }}>가격정보 : </span>
              <TextField
                label="가격"
                value={price}
                onChange={handlePriceChange}
                margin="normal"
                sx={{ width: "130px" }}
              />
              <TextField
                label="SALE %"
                value={sale}
                onChange={handleSaleChange}
                margin="normal"
                sx={{ marginX: "10px", width: "130px" }}
              />
              <span style={{ color: "blue" }}>
                {price && sale
                  ? `할인적용가 : ${
                      (Number(price) / 100) * (100 - Number(sale))
                    } 원`
                  : ""}
              </span>
            </ContentText>
            <ContentText style={{ marginBottom: "20px" }}>
              <span style={{ marginRight: "10px", marginLeft: "12px" }}>
                부가정보 :{" "}
              </span>
              <TextField
                label="SEASON"
                value={season}
                onChange={handleSeasonChange}
                margin="normal"
                placeholder="ex) 2022 F/W"
                sx={{ width: "130px" }}
              />
              <TextField
                label="TYPE"
                value={type}
                onChange={handleTypeChange}
                margin="normal"
                placeholder="ex) NEW"
                sx={{ marginLeft: "10px", width: "130px" }}
              />
            </ContentText>
            <ContentText style={{ marginBottom: "20px", marginLeft: "14px" }}>
              <span style={{ marginRight: "10px" }}>썸네일</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                style={{ display: "none" }}
                id="thumbnail-upload"
              />

              {thumbnail && (
                <img
                  src={thumbnailpre}
                  alt="Thumbnail Preview"
                  style={{ marginLeft: "10px", maxHeight: "100px" }}
                />
              )}
              <label htmlFor="thumbnail-upload">
                <Button
                  variant="contained"
                  component="span"
                  sx={{ marginLeft: "20px" }}
                >
                  이미지 찾기
                </Button>
              </label>
            </ContentText>
            <ReactQuill
              value={contentValue}
              onChange={handleContentChange}
              style={{ height: "600px" }}
              modules={modules}
              theme="snow"
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ marginTop: "60px" }}
            >
              등록하기
            </Button>
          </form>
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

export default ProductFix;
