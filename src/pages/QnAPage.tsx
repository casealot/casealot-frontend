import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../atom/apiCall";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface QNA {
  content: string;
  createdDt: string;
  customerId: string;
  id: number;
  modifiedDt: string;
  title: string;
  views: number;
}

interface QnaListResponseType {
  header: {
    code: number;
    message: string;
  };
  body: {
    qna: QNA[];
  };
}
const getQnaList = async () => {
  const response = await api.get<QnaListResponseType>("/cal/v1/qna/list");
  console.log(response);
  return response.data;
};

const QnaPage = () => {
  const {
    data: qnaList,
    isLoading,
    isError,
  } = useQuery(["qnaList"], getQnaList, {
    refetchOnWindowFocus: false,
  });

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = qnaList
    ? qnaList.body.qna.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const totalPages = Math.ceil((qnaList?.body.qna.length || 0) / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const navigate = useNavigate();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching Q&A list</p>;
  }

  return (
    <>
      <Container maxWidth="xl" sx={{ minHeight: "880px" }}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="blue"
          gutterBottom
          paddingTop={10}
          sx={{ margin: "50px 0" }}
        >
          Q&A
        </Typography>
        <div style={{ display: "flex" }}>
          <Button
            variant="contained"
            sx={{ marginLeft: "auto", marginBottom: "5px" }}
            onClick={() => {
              navigate("/qna/new");
            }}
          >
            문의하기
          </Button>
        </div>
        <TableContainer
          sx={{
            marginBottom: "50px",
            borderTop: "1px solid",
            borderTopColor: "#d3d3d3",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell align="right">CONTENT</TableCell>
                <TableCell align="right">CREATED DATE</TableCell>
                <TableCell align="right">CUSTOMER ID</TableCell>
                <TableCell align="right">VIEWS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((row: QNA, index: number) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell scope="row">{row.id}</TableCell>
                  <TableCell align="right">{row.title}</TableCell>
                  <TableCell align="right">{row.createdDt}</TableCell>
                  <TableCell align="right">{row.customerId}</TableCell>
                  <TableCell align="right">{row.views}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "50px",
        }}
      >
        {pageNumbers.map((pageNumber) => (
          <Button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            disabled={currentPage === pageNumber}
            style={{ marginRight: "5px" }}
            sx={{ minWidth: "fit-content" }}
          >
            {pageNumber}
          </Button>
        ))}
      </div>
    </>
  );
};

export default QnaPage;
