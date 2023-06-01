import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
];
const QnaPage = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(rows.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const navigate = useNavigate();
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
                <TableCell align="right">IMAGE</TableCell>
                <TableCell align="right">TITLE</TableCell>
                <TableCell align="right">POSTED BY</TableCell>
                <TableCell align="right">DATE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
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
