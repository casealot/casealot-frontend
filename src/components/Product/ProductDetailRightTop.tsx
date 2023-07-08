import React from "react";
import styled from "styled-components";

interface DetailRightTopProps {
  name: string;
  price: number;
  calculatePrice: number;
  quantity: number;
  sale: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const Wrapper = styled.div`
  position: relative;
  padding-bottom: 17px;
  border-bottom: 1px solid #222;
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

const DetailRightTop: React.FC<DetailRightTopProps> = ({
  name,
  price,
  calculatePrice,
  quantity,
  sale,
  setQuantity,
}) => {
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  return (
    <Wrapper>
      <div style={{ display: "flex", borderBottom: "1px solid #d3d3d3" }}>
        <DetailTitle>{name}</DetailTitle>
      </div>
      <div
        style={{
          marginTop: "27px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          borderBottom: "1px solid #d3d3d3",
          paddingBottom: "20px",
        }}
      >
        <div style={{ display: "flex" }}>
          <span
            style={{
              fontSize: "16px",
              marginRight: "30px",
              width: "33%",
            }}
          >
            판매가
          </span>
          <span
            style={{
              fontSize: "16px",
              marginLeft: "auto",
            }}
          >
            {price}원
          </span>
        </div>
        <div style={{ display: "flex" }}>
          <span
            style={{
              fontSize: "16px",
              marginRight: "30px",
              width: "33%",
            }}
          >
            할인율
          </span>
          <span
            style={{
              fontSize: "16px",
              marginLeft: "auto",
              color: "#808080",
            }}
          >
            {sale} %
          </span>
        </div>
        <div style={{ display: "flex" }}>
          <span
            style={{
              fontSize: "16px",
              marginRight: "30px",
              width: "33%",
            }}
          >
            할인판매가
          </span>
          <span
            style={{
              fontSize: "16px",
              marginLeft: "auto",
              fontWeight: "bold",
            }}
          >
            {calculatePrice}원
          </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          marginTop: "20px",
          maxHeight: "30px",
        }}
      >
        <span
          style={{
            fontSize: "14px",
            marginRight: "30px",
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontSize: "16px",
            marginRight: "30px",
            marginLeft: "auto",
          }}
        >
          <input
            value={quantity}
            onChange={handleQuantityChange}
            type="number"
            min={1}
            max={50}
            style={{
              padding: "4px",
              fontSize: "12px",
              width: "40px",
            }}
          />{" "}
          개
        </span>
        <span
          style={{
            fontSize: "16px",
            marginLeft: "auto",
          }}
        >
          {calculatePrice * quantity}원
        </span>
      </div>
    </Wrapper>
  );
};

export default DetailRightTop;
