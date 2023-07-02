import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchBar from "./SearchBar";
import NavRight from "./NavRight";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Grid } from "@mui/material";
import Logo from "../../dummy/img/logo.png";
import styled from "styled-components";

const Nav = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const NavListButton = styled(Button)`
    color: #000;
    font-weight: 600;
  `;

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
      name: "LOOKBOOK",
    },
  ];
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <CssBaseline />
        <AppBar position="static" sx={{ background: "#fff" }}>
          <Container maxWidth="xl">
            <Toolbar sx={{ margin: "0" }}>
              <Typography
                variant="h2"
                component="div"
                noWrap
                sx={{
                  flexGrow: 1,
                  display: {
                    xs: "none",
                    sm: "block",
                    flexGrow: 1,
                    textAlign: "left",
                    fontSize: "26px",
                  },
                }}
              >
                <Link
                  to={"/"}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  CASE A LOT
                </Link>
              </Typography>
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

                {/* //상단 우측 버튼// */}
                <NavRight />
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link to="/">
          <img src={Logo} style={{ height: "180px", marginTop: "10px" }} />
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
              }}
            >
              {NavList.map((item) =>
                item.name === "ALL" ? (
                  <Link to="/products/">
                    <Grid item xs={1}>
                      <NavListButton
                        sx={{
                          color: "#000",
                          fontWeight: "bold",
                          fontSize: "16px",
                        }}
                      >
                        {item.name}
                      </NavListButton>
                    </Grid>
                  </Link>
                ) : (
                  <Link to={`/products/category/${item.name.toLowerCase()}`}>
                    <Grid item xs={1}>
                      <NavListButton
                        sx={{
                          color: "#000",
                          fontWeight: "bold",
                          fontSize: "16px",
                        }}
                      >
                        {item.name}
                      </NavListButton>
                    </Grid>
                  </Link>
                )
              )}

              {/* <span style={{ margin: "0 50px" }}>NEW COLLECTION</span>
              <span style={{ margin: "0 50px" }}>BEST</span>
              <span style={{ margin: "0 50px" }}>CAP</span>
              <span style={{ margin: "0 50px" }}>TOP</span>
              <span style={{ margin: "0 50px" }}>BOTTOM</span>
              <span style={{ margin: "0 50px" }}>ACCESSORY</span>
              <span style={{ margin: "0 50px" }}>LOOKBOOK</span> */}
            </Grid>
          </Container>
        </div>
      )}
    </>
  );
};

export default Nav;
