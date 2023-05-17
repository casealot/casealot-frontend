import { AppBar, Toolbar, Typography } from "@mui/material";
import styled from "styled-components";

const StyledAppBar = styled(AppBar)`
  background-color: #ffffff;
  color: #000000;
`;

const Header = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6">Shopping Mall</Typography>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
