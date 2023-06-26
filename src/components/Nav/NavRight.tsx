import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useRecoilValueLoadable } from "recoil";
import { CartListState } from "../../atom/Cart";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../atom/apiCall";
import { NoneStyledLink } from "../Useable/Link";

const NavRight = () => {
  const [accountAnchorEl, setAccountAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [communityAnchorEl, setCommunityAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const cartCountLoadable = useRecoilValueLoadable(CartListState);
  const accountMenuOpen = Boolean(accountAnchorEl);
  const communityMenuOpen = Boolean(communityAnchorEl);
  const accessToken = localStorage.getItem("accessToken");

  console.log(accessToken);

  const handleAccountClick = (event: React.MouseEvent<HTMLElement>) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleCommunityClick = (event: React.MouseEvent<HTMLElement>) => {
    setCommunityAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAccountAnchorEl(null);
    setCommunityAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await api.delete("/cal/v1/customer/logout");

      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");
      localStorage.removeItem("refreshToken");
      navigate("/");
      location.reload();
    } catch (error) {
      console.error("Logout Failed", error);
    }
  };

  const cartCount =
    cartCountLoadable.state === "hasValue"
      ? cartCountLoadable.contents.length
      : 0;

  // eslint-disable-next-line no-constant-condition
  return accessToken ? (
    <>
      <Button sx={{ color: "#fff" }} onClick={() => navigate("/products")}>
        Product
      </Button>
      <Button
        id="account-menu-button"
        aria-controls={accountMenuOpen ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={accountMenuOpen ? "true" : undefined}
        onClick={handleAccountClick}
        sx={{ color: "#fff" }}
      >
        Account
      </Button>

      <Menu
        id="account-menu"
        anchorEl={accountAnchorEl}
        open={accountMenuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "account-menu-button",
        }}
        sx={{ transition: "ease 0.3s" }}
      >
        <NoneStyledLink to="/mypage">
          <MenuItem onClick={handleMenuClose}>MYPAGE</MenuItem>
        </NoneStyledLink>
        <NoneStyledLink to="/mypage/orderlist">
          <MenuItem onClick={handleMenuClose}>ORDER</MenuItem>
        </NoneStyledLink>
        <NoneStyledLink to="/wishlist">
          <MenuItem onClick={handleMenuClose}>WISHLIST</MenuItem>
        </NoneStyledLink>
      </Menu>

      <Button
        id="community-menu-button"
        aria-controls={communityMenuOpen ? "community-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={communityMenuOpen ? "true" : undefined}
        onClick={handleCommunityClick}
        sx={{ color: "#fff" }}
      >
        Community
      </Button>

      <Menu
        id="community-menu"
        anchorEl={communityAnchorEl}
        open={communityMenuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "community-menu-button",
        }}
        sx={{ transition: "ease 0.3s" }}
      >
        <NoneStyledLink to="/mypage">
          <MenuItem onClick={handleMenuClose}>Notice</MenuItem>
        </NoneStyledLink>
        <NoneStyledLink to="/mypage">
          <MenuItem onClick={handleMenuClose}>Q&A</MenuItem>
        </NoneStyledLink>
      </Menu>
      <Link to="/cart">
        <Button sx={{ color: "#fff" }}>
          <Badge badgeContent={cartCount} color="primary">
            <ShoppingCartIcon sx={{ marginLeft: "2px" }} />
          </Badge>
        </Button>
      </Link>
      <Button sx={{ color: "#fff" }} onClick={handleLogout}>
        Logout
      </Button>
    </>
  ) : (
    <>
      <Button sx={{ color: "#fff" }} onClick={() => navigate("/products")}>
        Product
      </Button>
      <Button sx={{ color: "#fff" }} onClick={() => navigate("/signin")}>
        Login
      </Button>
    </>
  );
};

export default NavRight;
