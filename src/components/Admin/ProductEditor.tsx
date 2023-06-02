import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { TextField, Button } from "@mui/material";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";

const ProductEditor = () => {
  const { quill, quillRef } = useQuill();
  const [title, setTitle] = useState("");

  const [contentValue, setContentValue] = useState("");

  useEffect(() => {
    if (quill) {
      quill.on("text-change", handleContentChange);
    }
  }, [quill]);

  const handleSave = (event: FormEvent) => {
    event.preventDefault();
    const data = {
      title: title,

      content: contentValue,
    };
    console.log(data); // 예시로 콘솔에 출력합니다.
    // ... 서버로 데이터 전송하는 로직을 추가해야 합니다.
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = () => {
    if (quill) {
      const content = quill.root.innerHTML;
      setContentValue(content);
    }
  };

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <form onSubmit={handleSave}>
        <TextField
          label="Title"
          value={title}
          onChange={handleTitleChange}
          fullWidth
          margin="normal"
        />

        <div ref={quillRef} style={{ height: "600px" }} />
        <Button variant="contained" type="submit" sx={{ marginTop: "20px" }}>
          등록하기
        </Button>
      </form>
    </div>
  );
};

export default ProductEditor;
