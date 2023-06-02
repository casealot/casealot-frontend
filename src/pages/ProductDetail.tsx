import CssBaseline from "@mui/material/CssBaseline";
import { useParams } from "react-router";
import { ProductListAtom, fakeProduct } from "../atom/Product";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/material/Button";
import { CartListState } from "../atom/Cart";
import { cartItems } from "../atom/Cart";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const params = Number(id);
  // const [productData, setProductData] =
  //   useRecoilState<fakeProduct[]>(ProductListAtom);

  const productData = useRecoilValue<fakeProduct[]>(ProductListAtom);

  const [cartItems, setCartItems] = useRecoilState<cartItems[]>(CartListState);

  const filter: fakeProduct[] = productData.filter(
    (item) => item.id === params
  );

  //카트 담기 이벤트//
  const handleAddToCart = () => {
    const selectedProduct = filter[0];
    const isInCart = cartItems.find((item) => item.id === selectedProduct.id);

    if (isInCart) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === selectedProduct.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCartItems(updatedCartItems);
    } else {
      const updatedCartItems = [
        ...cartItems,
        { ...selectedProduct, quantity: 1 },
      ];
      setCartItems(updatedCartItems);
    }
  };
  // console.log(cartItems);
  const DetailTop = styled.div`
    width: 1180px;
    margin: 0 auto;
    margin-top: 80px;
    display: flex;
  `;
  const ThumbNail = styled.img`
    position: relative;
    width: 600px;
    height: 600px;
    padding-left: 50px;
    margin-right: auto;
    transform: scale(0.8);
  `;

  const DetailTitle = styled.h1`
    margin: 19px 0 9px;
    font-size: 27px;
    font-weight: 500;
    font-family: "ssgBan", sans-serif;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-break: keep-all;
    word-wrap: break-word;
    white-space: normal;
  `;
  const DetailRightTop = styled.div`
    position: relative;
    padding-bottom: 17px;
    border-bottom: 1px solid #222;
  `;
  return (
    <>
      <CssBaseline />

      {filter.map((item) => (
        <DetailTop>
          <ThumbNail src={item.image} />

          <div
            style={{ width: "470px", textAlign: "left", paddingTop: "20px" }}
          >
            <DetailRightTop>
              <DetailTitle>{item.title}</DetailTitle>
              <div
                style={{
                  marginTop: "27px",
                  display: "flex",
                }}
              >
                <span
                  style={{
                    fontSize: "23px",
                    fontWeight: "500",
                    marginRight: "auto",
                  }}
                >
                  {item.price}원
                </span>
                <span
                  style={{
                    alignItems: "right",
                    fontSize: "23px",
                    verticalAlign: "baseline",
                  }}
                >
                  <FavoriteBorderIcon
                    sx={{ marginLeft: "auto", paddingTop: "2px" }}
                  />
                </span>
              </div>
            </DetailRightTop>
            <div
              style={{
                display: "flex",
                marginTop: "20px",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  width: "220px",
                  marginRight: "auto",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#000",
                  borderColor: "#000",
                }}
                onClick={handleAddToCart}
              >
                장바구니 담기
              </Button>
              <Button
                variant="contained"
                size="large"
                sx={{
                  width: "220px",
                  marginLeft: "auto",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#fff",
                  borderColor: "#000",
                  backgroundColor: "#000",
                }}
              >
                바로구매
              </Button>
            </div>
          </div>
        </DetailTop>
      ))}
    </>
  );
};

export default ProductDetail;
