import * as React from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import Input from "@mui/joy/Input";
import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItem from "@mui/joy/ListItem";

import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import SendIcon from "@mui/icons-material/Send";
import Link from "@mui/material/Link";

const Footer = () => {
  return (
    <Sheet
      variant="solid"
      invertedColors
      sx={{
        flexGrow: 1,
        p: 2,
        mx: 0,
        my: 0,
        backgroundColor: "#000",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton variant="plain">
          <Link href={"https://github.com/casealot"}>
            <FacebookRoundedIcon />
          </Link>
        </IconButton>
        <IconButton variant="plain">
          <Link href={"https://github.com/casealot"}>
            <GitHubIcon />
          </Link>
        </IconButton>
        <Input
          variant="soft"
          placeholder="Your Email"
          type="email"
          name="email"
          endDecorator={
            <Button variant="soft" aria-label="subscribe">
              <SendIcon />
            </Button>
          }
          sx={{ ml: "auto", display: { xs: "none", md: "flex" } }}
        />
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { md: "flex-start" },
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography sx={{ marginLeft: "5px" }}>Case A Lot</Typography>
        <List
          size="sm"
          orientation="horizontal"
          wrap
          sx={{ flexGrow: 0, "--ListItem-radius": "8px" }}
        >
          <ListItem nested sx={{ width: { xs: "50%", md: 140 } }}>
            <ListSubheader>Sitemap</ListSubheader>
            <List>
              <ListItem>
                <ListItemButton>Services</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Blog</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Contact us</ListItemButton>
              </ListItem>
            </List>
          </ListItem>
          <ListItem nested sx={{ width: { xs: "50%", md: 180 } }}>
            <ListSubheader>Product</ListSubheader>
            <List sx={{ "--ListItemDecorator-size": "32px" }}>
              <ListItem>
                <ListItemButton>MUI Core</ListItemButton>
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
          </ListItem>
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
          level="body2"
          startDecorator={<Typography textColor="text.tertiary">by</Typography>}
        >
          Case A Lot
        </Typography>

        <Typography level="body3" sx={{ ml: "auto", mr: "4px" }}>
          Copyright 2023
        </Typography>
      </Box>
    </Sheet>
  );
};

export default Footer;
