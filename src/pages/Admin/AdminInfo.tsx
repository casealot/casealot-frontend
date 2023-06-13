import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Badge, Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import AdminInfoTop from "../../components/Admin/AdminInfoTop";

const AdminInfo = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#f5f5f5",
    ...theme.typography.body2,
    padding: "none",
    textAlign: "center",
    height: "480px",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <Container maxWidth="lg">
        <AdminInfoTop />
        <Grid container spacing={2} minHeight="1000px">
          <Grid item xs={6}>
            <Item sx={{ textAlign: "left" }}>
              <Typography
                sx={{
                  borderBottom: "1px solid #d3d3d3",
                  padding: "15px",
                  fontWeight: "600",
                }}
              >
                방문자 현황
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item></Item>
          </Grid>
          <Grid item xs={6}>
            <Item></Item>
          </Grid>
          <Grid item xs={6}>
            <Item></Item>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AdminInfo;
