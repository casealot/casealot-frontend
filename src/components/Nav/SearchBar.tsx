import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import SearchpopUp from "./SearchpopUp";
import { api } from "../../atom/apiCall";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.8),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },

  marginLeft: "auto",
  marginRight: "20px",
  width: "15%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  display: "none", // Added display none for mobile view
  [theme.breakpoints.up("sm")]: {
    display: "block",
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

    width: "50%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
    },
  },
}));

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);

  const getAutoComplete = async () => {
    const response = await api.get(`cal/v1/autocomplete?query=${searchValue}`);
    console.log(response.data.body);
    return response.data.body;
  };

  useEffect(() => {
    getAutoComplete();
  }, [searchValue]);

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
