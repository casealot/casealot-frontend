import { useState } from "react";
import styled from "styled-components";

import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../atom/apiCall";
import { NoneStyledLink } from "../Useable/Link";
import { Button } from "@mui/material";

const SearchWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  border: 1px solid #111;
  z-index: 41;
  box-sizing: content-box;
  text-align: left;
`;

const SearchArea = styled.div`
  position: relative;
  background-color: #fff;
  z-index: 1;
`;

const Search = styled.input`
  max-width: 410px;
  height: 40px;
  padding: 0 68px 2px 20px;
  font-size: 17px;
  font-weight: 700;
  outline: none;
`;

const WrapWords = styled.div`
  width: 100%;
  border-top: 1px solid #111;
  background-color: #fff;
  display: block;
  padding-bottom: 20px;
`;

const Left = styled.div`
  position: relative;
  width: 100%;
`;

const Right = styled.div`
  border-left: 1px solid #eee;
  width: 100%;
`;

const Title = styled.div`
  padding: 22px 20px 0;
  font-size: 15px;
  font-weight: 700;

  color: #808080;
`;

const Swiper = styled.div`
  overflow: hidden;
  margin: 30 30px;
`;

const ProductList = styled.ul`
  padding: 10px 11px 25px;
  max-height: 500px;
  overflow-x: hidden;
  overflow-y: visible;
  -ms-scroll-chaining: none;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
`;

const ProductListli = styled.li`
  margin-left: 10px;
  position: relative;

  padding: 10px 25px 10px 11px;
  line-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #111;
  border-top: 1px solid #d3d3d3;
  a {
    text-decoration: none;
    color: inherit;
  }

  .highlight {
    color: red;
    font-weight: 600;
  }
`;

type SearchValue = {
  keyword: string;
  hlKeyword: string;
};
const SearchpopUp = () => {
  // const [productData, setProductData] =
  //   useRecoilState<fakeProduct[]>(ProductListAtom);
  const [searchValue, setSearchValue] = useState<string>("");

  const [productData, setProductData] = useState<SearchValue[]>([]);
  const navigate = useNavigate();
  const getAuto = async (query: string) => {
    const response = await api.get(`cal/v1/autocomplete?query=${query}`);

    setProductData(response.data.body.item);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);

    if (inputValue.length >= 1) {
      getAuto(inputValue);
    }
  };

  const highlightMatchingText = (text: string) => {
    if (!searchValue) return text;

    const regex = new RegExp(
      `(${searchValue.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")})`,
      "gi"
    );
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (part.toLowerCase() === searchValue.toLowerCase()) {
        return (
          <span key={index} className="highlight">
            {part}
          </span>
        );
      }
      return part;
    });
  };
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(`/search/${searchValue}`);
    }
  };
  return (
    <SearchWrap>
      <SearchArea>
        <Search
          value={searchValue}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
        <Button sx={{ position: "absolute", right: "0", marginTop: "5px" }}>
          Enter
        </Button>
      </SearchArea>
      <WrapWords>
        <Left>
          <Title>검색어를 입력하고 Enter를 누르세요</Title>
          <ProductList>
            {productData.map((item, index: number) => (
              <NoneStyledLink to={`/search/${item.keyword}`} key={index}>
                <ProductListli>
                  <span>{highlightMatchingText(item.keyword)}</span>
                </ProductListli>
              </NoneStyledLink>
            ))}
          </ProductList>
        </Left>
        <Right></Right>
      </WrapWords>
    </SearchWrap>
  );
};

export default SearchpopUp;
