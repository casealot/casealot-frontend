import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  SelectChangeEvent,
  InputLabel,
} from "@mui/material";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { api } from "../../atom/apiCall";
import { styled } from "styled-components";

const ContentText = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 39px;
  font-weight: 600;
`;
const ProductEditor = () => {
  const { quill, quillRef } = useQuill();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [sale, setSale] = useState("");
  const [season, setSeason] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");

  const [contentValue, setContentValue] = useState("");

  useEffect(() => {
    if (quill) {
      quill.on("text-change", handleContentChange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quill]);

  const handleSave = async (event: FormEvent) => {
    event.preventDefault();

    const response = api.post("/cal/v1/admin/product", {
      name: name,
      content: contentValue,
      color: color,
      price: price,
      sale: sale,
      season: season,
      type: type,
    });

    console.log(response); // 예시로 콘솔에 출력합니다.
    // ... 서버로 데이터 전송하는 로직을 추가해야 합니다.
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const handleContentChange = () => {
    if (quill) {
      const content = quill.root.innerHTML;
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
  return (
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
            sx={{ width: "220px" }}
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

        <div ref={quillRef} style={{ height: "600px" }} />
        <Button variant="contained" type="submit" sx={{ marginTop: "20px" }}>
          등록하기
        </Button>
      </form>
    </div>
  );
};

export default ProductEditor;
