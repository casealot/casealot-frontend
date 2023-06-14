import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { api } from "../../atom/apiCall";

import { useQuery } from "@tanstack/react-query";
import Loading from "../Useable/Loading";

type Data = {
  today: string;
  todayOrder: number;
  todayCash: number;
  todaySignIn: number;
  todayQna: number;
  todayReview: number;
};
type getWeekly = {
  function: Data[];
};

const DateTable = () => {
  const getWeekly = async () => {
    try {
      const response = await api.get("cal/v1/function/weekly");
      return response.data.body;
    } catch (error) {
      console.log(error);
    }
  };
  const { data, isLoading } = useQuery<getWeekly>(["weeklyInfo"], getWeekly);

  const calculateWeeklyTotal = (data: Data[]) => {
    return data.reduce(
      (total, item) => {
        total.todayOrder += item.todayOrder;
        total.todayCash += item.todayCash;
        total.todaySignIn += item.todaySignIn;
        total.todayQna += item.todayQna;
        total.todayReview += item.todayReview;
        return total;
      },
      {
        todayOrder: 0,
        todayCash: 0,
        todaySignIn: 0,
        todayQna: 0,
        todayReview: 0,
      }
    );
  };

  const weeklyTotal = data ? calculateWeeklyTotal(data.function) : null;

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Typography
        sx={{
          borderBottom: "1px solid #d3d3d3",
          padding: "15px",
          fontWeight: "600",
        }}
      >
        일자별 요약
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>일자</TableCell>
              <TableCell>주문수</TableCell>
              <TableCell>매출액</TableCell>
              <TableCell>가입</TableCell>
              <TableCell>문의</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data ? (
              data.function.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.today}</TableCell>
                  <TableCell>{item.todayOrder}</TableCell>
                  <TableCell>{item.todayCash}</TableCell>
                  <TableCell>{item.todaySignIn}</TableCell>
                  <TableCell>{item.todayQna}</TableCell>
                </TableRow>
              ))
            ) : (
              <Loading />
            )}

            <TableRow>
              <TableCell>최근 7일 합계</TableCell>
              <TableCell>{weeklyTotal?.todayOrder}</TableCell>
              <TableCell>{weeklyTotal?.todayCash}</TableCell>
              <TableCell>{weeklyTotal?.todaySignIn}</TableCell>
              <TableCell>{weeklyTotal?.todayQna}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DateTable;
