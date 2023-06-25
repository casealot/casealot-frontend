import { Typography, Badge } from "@mui/material";
import { Box } from "@mui/system";
import { api } from "../../atom/apiCall";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Useable/Loading";

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
          padding: "17px",
        }}
      >
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

        <Typography
          sx={{ fontSize: "12px", marginLeft: "4px", fontWeight: "600" }}
        >
          교환문의
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
        <Typography
          sx={{ fontSize: "12px", marginLeft: "4px", fontWeight: "600" }}
        >
          취소문의
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
    </Box>
  );
};

export default AdminInfoTop;
