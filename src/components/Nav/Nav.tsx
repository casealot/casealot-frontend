import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import navLogo from "../../dummy/img/navlogo.jpg";
import Toolbar from "@mui/material/Toolbar";
import SearchBar from "./SearchBar";
import NavRight from "./NavRight";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Grid } from "@mui/material";
import removebg from "../../dummy/img/removebg.png";
import styled from "styled-components";
import { useState } from "react";

const NavListButton = styled(Button)`
  color: #000;
  font-weight: 600;
`;

const Nav = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const [hover, setHovered] = useState(false);
  const handleHover = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const MainNav = {
    ...(pathname === "/" && { opacity: hover ? 0.8 : 0.3 }),
    transition: "0.2 ease-out",
  };
  const MainBannerStyle =
    pathname === "/"
      ? {
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#fff",
        }
      : { display: "flex", justifyContent: "center" };

  const NavList = [
    {
      name: "ALL",
    },
    {
      name: "NEW",
    },
    {
      name: "BEST",
    },
    {
      name: "CAP",
    },
    {
      name: "TOP",
    },
    {
      name: "BOTTOM",
    },
    {
      name: "ACCESSORY",
    },
    {
      name: "SHOES",
    },
  ];
  return (
    <div
      style={MainNav}
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <CssBaseline />

        <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
          <Container maxWidth="xl">
            <Toolbar sx={{ margin: "0" }}>
              <Link to={"/"} style={{ textDecoration: "none", color: "#000" }}>
                <div>
                  <img src={navLogo} />
                </div>
              </Link>

              <SearchBar />
              <Box
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                }}
              >
                {/* {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button> */}

                <NavRight />
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <div style={MainBannerStyle}>
        <Link to="/">
          <img src={removebg} style={{ height: "180px", marginTop: "10px" }} />
        </Link>
      </div>
      {pathname?.includes("admin") ? (
        ""
      ) : (
        <div
          style={{
            display: "flex",
            height: "60px",
            fontWeight: "500",
            borderBottom: "1px solid #d3d3d3",
            borderTop: "3px solid #808080",
            backgroundColor: "#fff",
          }}
        >
          <Container maxWidth="xl">
            <Grid
              container
              gap={6}
              justifyContent="center"
              alignItems="center"
              height="100%"
              sx={{
                borderLeft: "1px solid #d3d3d3",
                borderRight: "1px solid #d3d3d3",
                textOverflow: "hidden",
                overflow: "hidden",
                marginY: "auto",
              }}
            >
              {NavList.map(
                (item) => (
                  // item.name === "ALL" ? (
                  //   <Grid item xs={1} key={item.name}>
                  //     <Link to="/products/">
                  //       <NavListButton
                  //         sx={{
                  //           color: "#000",
                  //           fontWeight: "bold",
                  //           fontSize: "16px",
                  //         }}
                  //       >
                  //         {item.name}
                  //       </NavListButton>
                  //     </Link>
                  //   </Grid>
                  // ) : (
                  <Grid item xs={1} key={item.name}>
                    <Link to={`/products/category/${item.name.toLowerCase()}`}>
                      <NavListButton
                        sx={{
                          color: "#000",
                          fontWeight: "bold",
                          fontSize: "16px",
                          marginY: "auto",
                        }}
                      >
                        {item.name}
                      </NavListButton>
                    </Link>
                  </Grid>
                )
                // )
              )}
            </Grid>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Nav;
