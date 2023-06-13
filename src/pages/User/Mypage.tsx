import Divider from "@mui/material/Divider";
import { Container, Grid, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { NoneStyledLink } from "../../components/Useable/Link";

const Mypage = () => {
  return (
    <>
      <Container maxWidth="xl">
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="blue"
          gutterBottom
          paddingTop={10}
        >
          MY ACCOUNT
        </Typography>
        <Link
          to="/mypage/profile"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {" "}
          <AccountCircleIcon
            sx={{
              width: "8em",
              height: "8em",
              color: "#808080",
              marginY: "20px",
            }}
          />
        </Link>
        <Grid
          container
          spacing={0}
          maxWidth="lg"
          sx={{
            marginX: "auto",
            verticalAlign: "middle",
            marginTop: "36px",
            marginBottom: "10px",
          }}
        >
          <Grid
            item
            xs={4}
            paddingY="0px"
            sx={{ paddingY: "24px", display: "flex", marginLeft: "24px" }}
          >
            <span style={{ fontSize: "24px", margin: "0 auto" }}>
              배송준비
              <br />0
            </span>
            <Divider orientation="vertical" flexItem sx={{ fontSize: "24px" }}>
              →
            </Divider>
          </Grid>
          <Grid
            item
            xs={4}
            paddingY="0px"
            sx={{ paddingY: "24px", display: "flex" }}
          >
            <span
              style={{ fontSize: "24px", margin: "0 auto", fontWeight: "500" }}
            >
              배송중
              <br />0
            </span>
            <Divider orientation="vertical" flexItem sx={{ fontSize: "24px" }}>
              →
            </Divider>
          </Grid>
          <Grid
            item
            xs={3.2}
            paddingY="0px"
            sx={{ paddingY: "24px", display: "flex", paddingLeft: "24px" }}
          >
            <span
              style={{ fontSize: "24px", margin: "0 auto", fontWeight: "500" }}
            >
              배송완료
              <br />0
            </span>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          maxWidth="lg"
          sx={{
            marginX: "auto",
            verticalAlign: "middle",
            border: "1px solid",
            marginTop: "0px",
            marginBottom: "80px",
          }}
        >
          <Grid
            item
            xs={4}
            paddingY="0px"
            sx={{ padding: "24px", borderRight: "1px solid" }}
          >
            <NoneStyledLink to="/mypage/profile">
              <ManageAccountsIcon sx={{ width: "2em", height: "2em" }} />
              <br />
              <span style={{ fontSize: "24px", margin: "0 auto" }}>
                회원정보
              </span>
            </NoneStyledLink>
          </Grid>

          <Grid
            item
            xs={4}
            paddingY="0px"
            sx={{ padding: "24px", borderRight: "1px solid" }}
          >
            <NoneStyledLink to="/cart">
              <ShoppingBagIcon sx={{ width: "2em", height: "2em" }} />
              <br />
              <span
                style={{
                  fontSize: "24px",
                  margin: "0 auto",
                  fontWeight: "500",
                }}
              >
                장바구니
              </span>
            </NoneStyledLink>
          </Grid>

          <Grid item xs={4} paddingY="0px" sx={{ padding: "24px" }}>
            <NoneStyledLink to="/wishlist">
              <FavoriteBorderOutlinedIcon
                sx={{ width: "2em", height: "2em" }}
              />
              <br />
              <span style={{ fontSize: "24px", margin: "0 auto" }}>
                위시리스트
              </span>
            </NoneStyledLink>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Mypage;
