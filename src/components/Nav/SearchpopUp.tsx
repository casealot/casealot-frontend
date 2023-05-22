import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { fakeProduct, ProductListAtom } from "../../atom/Product";
import { ChangeEvent } from "react";

const SearchWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  border: 1px solid #111;
  z-index: 41;
  display: block;
  box-sizing: content-box;
  text-align: left;
`;

const SearchArea = styled.div`
  position: relative;
  background-color: #fff;
  z-index: 1;
`;

const Search = styled.input`
  width: 410px;
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

}

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
  color: #000;
`;
const Swiper = styled.div`
  overflow: hidden;
  margin: 0 30px;
  color: #000;
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
  border-radius: 5px;
  overflow: hidden;
  color: #111;
`;
const SearchpopUp = () => {
  const [productData, setProductData] =
    useRecoilState<fakeProduct[]>(ProductListAtom);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <SearchWrap>
      <SearchArea>
        <Search value={searchValue} onChange={onChange} />
      </SearchArea>
      <WrapWords>
        <Left>
          {searchValue.length < 1 ? (
            <>
              <Title>최근 검색어</Title>
              <Swiper>최근 검색어가 없습니다.</Swiper>
            </>
          ) : (
            <ProductList>
              {productData.map((item) => (
                <ProductListli>{item.title}</ProductListli>
              ))}
            </ProductList>
          )}
        </Left>
        <Right></Right>
      </WrapWords>
    </SearchWrap>
  );
};

export default SearchpopUp;
