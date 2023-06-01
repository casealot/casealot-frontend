import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useRecoilValue } from "recoil";
import { CartListState } from "../../atom/Cart";
import { Link, useNavigate } from "react-router-dom";

const NavRight = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const cartCount = useRecoilValue(CartListState);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Count = cartCount.length;

  const navigate = useNavigate();
  return (
    <>
      <Button
        id="fade-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "#fff" }}
      >
        Account
      </Button>

      <Menu
        id="fade-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        sx={{ transition: "ease 0.3s" }}
      >
        {" "}
        <Link to="/mypage" style={{ textDecoration: "none", color: "inherit" }}>
          {" "}
          <MenuItem onClick={handleClose}>MYPAGE</MenuItem>{" "}
        </Link>
        <MenuItem onClick={handleClose}>ORDER</MenuItem>
      </Menu>

      <Button
        sx={{ color: "#fff" }}
        onClick={() => {
          navigate("/notice");
        }}
      >
        NOTICE
      </Button>
      <Button
        sx={{ color: "#fff" }}
        onClick={() => {
          navigate("/qna");
        }}
      >
        Q&A
      </Button>
      <Link to="/cart">
        <Button sx={{ color: "#fff" }}>
          <Badge badgeContent={Count} color="primary">
            <ShoppingCartIcon sx={{ marginLeft: "2px" }} />
          </Badge>
        </Button>
      </Link>
    </>
  );
};

export default NavRight;
