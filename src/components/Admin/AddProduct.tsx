import { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { Accept, useDropzone } from "react-dropzone";

const ProductForm = () => {
  const [product, setProduct] = useState<{
    name: string;
    description: string;
    thumbnail: File | null;
    category: string;
    price: number;
    stock: number;
  }>({
    name: "",
    description: "",
    thumbnail: null,
    category: "",
    price: 0,
    stock: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleThumbnailDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const thumbnail = acceptedFiles[0];
      setProduct((prevProduct) => ({ ...prevProduct, thumbnail }));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    if (product.thumbnail) {
      formData.append("thumbnail", product.thumbnail);
    }
    formData.append("category", product.category);
    formData.append("price", String(product.price));
    formData.append("stock", String(product.stock));

    try {
      // Send the formData to your server using fetch or axios
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      // Handle the response as needed
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*" as unknown as Accept,
    multiple: false,
    onDrop: handleThumbnailDrop,
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        상품 등록
      </Typography>
      <TextField
        name="name"
        label="상품명"
        variant="outlined"
        fullWidth
        value={product.name}
        onChange={handleInputChange}
        sx={{ marginBottom: "20px" }}
      />
      <TextField
        name="description"
        label="상품 설명"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={product.description}
        onChange={handleDescriptionChange}
        sx={{ marginBottom: "20px" }}
      />
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {product.thumbnail ? (
          <img
            src={URL.createObjectURL(product.thumbnail)}
            alt="Thumbnail"
            style={{ width: "100%", marginBottom: "20px" }}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            이곳을 클릭하거나 이미지를 드래그해주세요
          </Typography>
        )}
      </div>
      <TextField
        name="category"
        label="카테고리"
        variant="outlined"
        fullWidth
        value={product.category}
        onChange={handleInputChange}
        sx={{ marginBottom: "20px" }}
      />
      <TextField
        name="price"
        label="가격"
        type="number"
        variant="outlined"
        fullWidth
        value={product.price}
        onChange={handleInputChange}
        sx={{ marginBottom: "20px" }}
      />
      <TextField
        name="stock"
        label="재고"
        type="number"
        variant="outlined"
        fullWidth
        value={product.stock}
        onChange={handleInputChange}
        sx={{ marginBottom: "20px" }}
      />
      <Button variant="contained" onClick={handleSubmit}>
        등록
      </Button>
    </Container>
  );
};

export default ProductForm;
