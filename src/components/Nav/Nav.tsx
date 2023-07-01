import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchBar from "./SearchBar";
import NavRight from "./NavRight";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import Logo from "../../dummy/img/logo.png";
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ["Login", "MyPage", "Notice"];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Case A Lot
      </Typography>

      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "64px",
          width: "100%",
        }}
      >
        <CssBaseline />
        <AppBar
          position="static"
          component="nav"
          sx={{ background: "#fff", width: "100%" }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ margin: "0" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              ></IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  display: {
                    xs: "none",
                    sm: "block",
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
          borderBottom: "1px solid #d3d3d3",
        }}
      >
        <Link to="/">
          <img src={Logo} style={{ height: "180px", marginTop: "10px" }} />
        </Link>
      </div>
    </>
  );
}
