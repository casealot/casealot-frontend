import { Typography, Badge, Button } from "@mui/material";
import { Box } from "@mui/system";
import { api } from "../../atom/apiCall";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Useable/Loading";
import { NoneStyledLink } from "../Useable/Link";

const AdminInfoTop = () => {
  const getdaily = async () => {
    const response = await api.get("cal/v1/function/daily");
    return response.data.body.function;
  };

  const { data, isLoading } = useQuery(["dailyinfo"], getdaily);
  const { todayOrder, todayCancel, todayChange, todayQna } = data || {};

  return isLoading ? (
    <Loading />
  ) : (
    <Box
      sx={{
        width: "100%",
        height: 100,
        marginTop: "80px",
        marginBottom: "20px",
        borderRadius: "10px",
        boxShadow: "1px",
        textAlign: "left",
        backgroundColor: "#f5f5f5",
        // "&:hover": {
        //   backgroundColor: "info.light",
        //   opacity: [0.9, 0.8, 0.7],
        // },
      }}
    >
      <div style={{ display: "flex", borderBottom: "1px solid #e0e0e0" }}>
        <Typography
          sx={{
            fontSize: "16px",
            color: "black",
            fontWeight: "600",
            padding: "10px",
            paddingLeft: "20px",
          }}
        >
          오늘의 할일
        </Typography>

        <Badge
          color="secondary"
          overlap="circular"
          badgeContent={Number(
            todayCancel + todayOrder + todayQna + todayChange
          )}
          sx={{ marginTop: "17px", marginLeft: "4px" }}
        />
      </div>

      <div
        style={{
          display: "flex",
          padding: "10px",
          paddingLeft: "17px",
          alignItems: "center",
        }}
      >
        <NoneStyledLink to="/admin/order">
          <div style={{ display: "flex" }}>
            <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
              신규주문
            </Typography>

            <Typography
              sx={{
                fontSize: "12px",
                color: "red",
                fontWeight: "600",
                marginLeft: "2px",
              }}
            >
              {todayOrder}
            </Typography>
          </div>
        </NoneStyledLink>

        <NoneStyledLink to="/admin/order">
          <div style={{ display: "flex" }}>
            <Typography
              sx={{ fontSize: "12px", marginLeft: "4px", fontWeight: "600" }}
            >
              교환내역
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "red",
                fontWeight: "600",
                marginLeft: "2px",
              }}
            >
              {todayChange}
            </Typography>
          </div>
        </NoneStyledLink>

        <NoneStyledLink to="/admin/order">
          <div style={{ display: "flex" }}>
            <Typography
              sx={{ fontSize: "12px", marginLeft: "4px", fontWeight: "600" }}
            >
              취소내역
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "red",
                fontWeight: "600",
                marginLeft: "2px",
              }}
            >
              {todayCancel}
            </Typography>
          </div>
        </NoneStyledLink>
        <NoneStyledLink to="/admin/qna">
          <div style={{ display: "flex" }}>
            <Typography
              sx={{ fontSize: "12px", marginLeft: "4px", fontWeight: "600" }}
            >
              답변대기 문의
            </Typography>

            <Typography
              sx={{
                fontSize: "12px",
                color: "red",
                fontWeight: "600",
                marginLeft: "2px",
              }}
            >
              {todayQna}
            </Typography>
          </div>
        </NoneStyledLink>
        <div
          style={{
            display: "flex",
            marginLeft: "auto",
          }}
        >
          <NoneStyledLink to="/admin/addproduct">
            <Button>상품등록</Button>
          </NoneStyledLink>
          <NoneStyledLink to="/admin/product">
            <Button>상품관리</Button>
          </NoneStyledLink>
          <NoneStyledLink to="/admin/product">
            <Button>배너관리</Button>
          </NoneStyledLink>
        </div>
      </div>
    </Box>
  );
};

export default AdminInfoTop;
