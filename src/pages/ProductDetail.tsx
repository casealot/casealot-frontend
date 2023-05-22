import CssBaseline from "@mui/material/CssBaseline";

import Container from "@mui/material/Container";
import { useParams } from "react-router";
import { ProductListAtom, fakeProduct } from "../atom/Product";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const params = Number(id);
  const [productData, setProductData] =
    useRecoilState<fakeProduct[]>(ProductListAtom);

  const filter: fakeProduct[] = productData.filter(
    (item) => item.id === params
  );

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
  `;

  const DetailTitle = styled.h1`
    margin: 19px 0 9px;
    font-size: 27px;
    font-weight: 700;
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

          <div style={{ width: "470px", textAlign: "left" }}>
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
          </div>
        </DetailTop>
      ))}
    </>
  );
};

export default ProductDetail;
