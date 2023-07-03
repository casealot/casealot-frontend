import Divider from "@mui/material/Divider";
import { Avatar, Container, Grid, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { NoneStyledLink } from "../../components/Useable/Link";
import { api } from "../../atom/apiCall";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Useable/Loading";
// import Banner from "../../components/Useable/Banner";

const Mypage = () => {
  const getMyPageData = async () => {
    const response = await api.get("/cal/v1/customer/mypage");
    return response.data.body.function;
  };
  const { data, isLoading } = useQuery(["getMyPageData"], getMyPageData);

  const { finish, ready, start } = data || {};

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Container maxWidth="xl">
        {/* <Banner item="MYPAGE" /> */}
        <Container maxWidth="xl">
          {data.profileImg ? (
            <Avatar
              src={data.profileImg.url}
              sx={{ width: "8em", height: "8em", margin: "0 auto" }}
            />
          ) : (
            <AccountCircleIcon
              sx={{
                width: "8em",
                height: "8em",
                color: "#808080",
                marginY: "20px",
              }}
            />
          )}
        </Container>
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
              <br />
              {ready}
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
              <br />
              {start}
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
              <br />
              {finish}
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
