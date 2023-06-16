import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import AdminInfoTop from "../../components/Admin/AdminInfoTop";
import DateTable from "../../components/Admin/DateTable";
import { api } from "../../atom/apiCall";
import { useEffect } from "react";

const AdminInfo = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#f5f5f5",
    ...theme.typography.body2,
    padding: "none",
    textAlign: "left",
    height: "536px",
    color: theme.palette.text.secondary,
  }));

  const getQnA = async () => {
    const response = await api.get("cal/v1/function/qna");
    console.log(response);
  };
  const getReview = async () => {
    const response = await api.get("cal/v1/function/review");
    console.log(response);
  };

  useEffect(() => {
    getQnA();
    getReview();
  }, []);
  return (
    <>
      <Container maxWidth="lg">
        <AdminInfoTop />
        <Grid container spacing={2} minHeight="1000px">
          <Grid item xs={6}>
            <Item>
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
            <Item>
              <DateTable />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Typography
                sx={{
                  borderBottom: "1px solid #d3d3d3",
                  padding: "15px",
                  fontWeight: "600",
                }}
              >
                문의내역
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Typography
                sx={{
                  borderBottom: "1px solid #d3d3d3",
                  padding: "15px",
                  fontWeight: "600",
                }}
              >
                리뷰현황
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AdminInfo;
