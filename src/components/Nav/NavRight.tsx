import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useRecoilValue } from "recoil";
import { CartListState } from "../../atom/Cart";

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
        MYPAGE
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
        <MenuItem onClick={handleClose}>MyPage</MenuItem>
        <MenuItem onClick={handleClose}>ORDER</MenuItem>
      </Menu>

      <Button sx={{ color: "#fff" }}>NOTICE</Button>

      <Button sx={{ color: "#fff" }}>
        <Badge badgeContent={Count} color="primary">
          <ShoppingCartIcon sx={{ marginLeft: "2px" }} />
        </Badge>
      </Button>
    </>
  );
};

export default NavRight;
