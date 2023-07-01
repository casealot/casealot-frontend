import Box from "@mui/joy/Box";

import Divider from "@mui/joy/Divider";

import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItem from "@mui/joy/ListItem";

import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import KakaoIcon from "../../dummy/img/kakao-ico.png";

import Link from "@mui/material/Link";

const Footer = () => {
  return (
    <Sheet
      variant="solid"
      sx={{
        flexGrow: 1,
        p: 2,
        mx: 0,
        my: 0,
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",

          gap: 2,
        }}
      >
        {/*<IconButton variant="plain">
          <Link href={"https://github.com/casealot"}>
            <FacebookRoundedIcon />
          </Link>
        </IconButton>*/}
        {/*<IconButton variant="plain">
          <Link href={"https://github.com/casealot"}>
            <GitHubIcon />
          </Link>
        </IconButton>*/}
        {/*<Input*/}
        {/*  variant="soft"*/}
        {/*  placeholder="Your Email"*/}
        {/*  type="email"*/}
        {/*  name="email"*/}
        {/*  endDecorator={*/}
        {/*    <Button variant="soft" aria-label="subscribe">*/}
        {/*      <SendIcon />*/}
        {/*    </Button>*/}
        {/*  }*/}
        {/*  sx={{ ml: "auto", display: { xs: "none", md: "flex" } }}*/}
        {/*/>*/}
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: "flex",
          marginLeft: "5%",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography
          level="body2"
          sx={{
            width: "60%",
            margin: "5% auto",
            textAlign: "left",
            lineHeight: "2",
            fontSize: "14px",
          }}
        >
          상호: 케이스어랏 | 대표: 나승일 | 개인정보관리책임자: 나승일 | 전화:
          070-8064-0299 | 이메일: casealot@naver.com
          <br />
          주소: 경기도 용인시 처인구 모현읍 오산리 395-11 사업자등록번호:
          289-40-00894 | 통신판매: 2021-용인처인-01385 | 호스팅제공자: (주)
          녀석들
        </Typography>
        <List
          size="sm"
          orientation="horizontal"
          wrap
          sx={{
            marginX: "8%",
            marginY: "4%",
            flexGrow: 1,
            "--ListItem-radius": "8px",
          }}
        >
          <ListItem nested sx={{ width: { xs: "60%", md: 140 } }}>
            <ListSubheader>CONTACT</ListSubheader>
            <List orientation="horizontal">
              {/* 이메일 /*/}
              <ListItem>
                <Link
                  color={"inherit"}
                  target={"_blank"}
                  href={"mailto:casealot@naver.com"}
                >
                  <EmailIcon />
                </Link>
              </ListItem>
              {/* 페이스북 /*/}
              <ListItem>
                <Link
                  color={"inherit"}
                  target={"_blank"}
                  href={"https://www.facebook.com/CASEALOTofficial"}
                >
                  <FacebookRoundedIcon />
                </Link>
              </ListItem>
              {/* 인스타 /*/}
              <ListItem>
                <Link
                  color={"inherit"}
                  target={"_blank"}
                  href={"https://www.instagram.com/casealot_official"}
                >
                  <InstagramIcon />
                </Link>
              </ListItem>
              {/* 카카오톡 /*/}
              <ListItem>
                <Link target={"_blank"} href={"https://pf.kakao.com/_nZjVb"}>
                  <img
                    src={KakaoIcon}
                    style={{
                      width: "24px",
                      height: "24px",
                      margin: "4px, 8px",
                    }}
                  />
                </Link>
              </ListItem>
            </List>
          </ListItem>
          {/*<ListItem nested sx={{ width: { xs: "50%", md: 180 } }}>
            <ListSubheader>Product</ListSubheader>
            <List sx={{ "--ListItemDecorator-size": "32px" }}>
              <ListItem>
                <ListItemButton>시발</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>MUI X</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  MUI Toolpad
                  <Chip
                    variant="soft"
                    size="sm"
                    sx={{ minHeight: 20, fontSize: "xs2", ml: "4px" }}
                  >
                    BETA
                  </Chip>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Design kits</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Templates</ListItemButton>
              </ListItem>
            </List>
          </ListItem>*/}
        </List>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          sx={{ fontWeight: "600" }}
          level="body2"
          startDecorator={<Typography textColor="text.tertiary">by</Typography>}
        >
          CASE A LOT
        </Typography>

        <Typography level="body3" sx={{ ml: "auto", mr: "4px" }}>
          Copyright 2023
        </Typography>
      </Box>
    </Sheet>
  );
};

export default Footer;
