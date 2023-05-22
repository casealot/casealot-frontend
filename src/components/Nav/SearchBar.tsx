import { styled, alpha } from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Popover, Typography } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { ProductListAtom, fakeProduct } from "../../atom/Product";
import { MouseEventHandler } from "react";
import SearchpopUp from "./SearchpopUp";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);
  const [productTitle, setProductTitle] = useState("");
  const [productData, setProductData] =
    useRecoilState<fakeProduct[]>(ProductListAtom);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  console.log(productData);
  return (
    <Search onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        type="text"
        value={searchValue}
        onChange={onChange}
        ref={inputRef}
        sx={{ position: "relative" }}
      />

      {isHovered ? <SearchpopUp /> : ""}
    </Search>
  );
};
export default SearchBar;
