import { useParams } from "react-router-dom";
import { api } from "../../atom/apiCall";
import { useEffect } from "react";

const ProductFix = () => {
  const params = useParams();

  const productId = params.id;

  const getProduct = async () => {
    const response = await api.get(`cal/v1/product/${productId}`);
    return response.data.body.product;
  };
  useEffect(() => {
    getProduct();
  }, []);

  return;
  <></>;
};

export default ProductFix;
