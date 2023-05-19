import styled from "styled-components";

const FilterArea = styled.ul`
  margin-top: 50px;
  text-align: center;
`;
const FilterItem = styled.li`
  display: inline-block;
  text-align: center;
  vertical-align: top;
  margin: 0 5px 10px;
  font-size: 20px;
  font-weight: 300;
  color: #2b64f3;
  padding: 15px 45px;
  border: 2px solid #2b64f3;
  border-radius: 26px;
  line-height: 1;
  cursor: pointer;
`;
const ProductFilter = () => {
  return (
    <>
      <FilterArea>
        <FilterItem>ALL</FilterItem>
        <FilterItem>Fashion</FilterItem>
        <FilterItem>Digital</FilterItem>
        <FilterItem>living</FilterItem>
        <FilterItem>AbcasdL</FilterItem>
        <FilterItem>ALLawsdaws</FilterItem>
        <FilterItem>ALdfwefaL</FilterItem>
        <FilterItem>AdfgdfgrgLL</FilterItem>
        <FilterItem>AsdLL</FilterItem>
      </FilterArea>
    </>
  );
};
export default ProductFilter;
