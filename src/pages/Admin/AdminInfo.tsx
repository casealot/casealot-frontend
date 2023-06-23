import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Container, Typography } from "@mui/material";
import AdminInfoTop from "../../components/Admin/AdminInfoTop";
import DateTable from "../../components/Admin/DateTable";
import { api } from "../../atom/apiCall";
import { useEffect } from "react";
import QnABoard from "../../components/Admin/QnABoard";
import ReviewBoard from "../../components/Admin/ReviewBoard";

const AdminInfo = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#f5f5f5",
    ...theme.typography.body2,
    padding: "none",
    textAlign: "left",
    height: "536px",
    color: theme.palette.text.secondary,
  }));

  const getReview = async () => {
    const response = await api.get("cal/v1/function/review");
    console.log(response);
  };

  const TitleTypography = styled(Typography)`
    position: absolute;
    top: 0;
    left: 0;
    padding: 15px;
    border-bottom: 1px solid #d3d3d3;
    font-weight: 600;
  `;
  const ScrollableContainer = styled(Item)`
    overflow: auto;

    ::-webkit-scrollbar {
      width: 0.8em;
    }

    ::-webkit-scrollbar-track {
      background-color: #f5f5f5;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #888;
    }
  `;
  useEffect(() => {
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
            <ScrollableContainer
              sx={{
                position: "relative",
              }}
            >
              <TitleTypography sx={{ width: "100%" }}>문의내역</TitleTypography>

              <QnABoard />
            </ScrollableContainer>
          </Grid>
          <Grid item xs={6}>
            <ScrollableContainer
              sx={{
                position: "relative",
              }}
            >
              <TitleTypography sx={{ width: "100%" }}>리뷰현황</TitleTypography>

              <ReviewBoard />
            </ScrollableContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AdminInfo;
