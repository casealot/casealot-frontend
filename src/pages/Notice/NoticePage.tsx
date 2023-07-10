import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled, alpha } from "@mui/material/styles";
import { Button, Container } from "@mui/material";
import { api } from "../../atom/apiCall";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import ErrorModal from "../../components/Modal/ErrorHandleModal";
import Loading from "../../components/Useable/Loading";
import { NoneStyledLink } from "../../components/Useable/Link";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Banner from "../../components/Useable/Banner";
import { NoticeItem, NoticeResponse } from "../../atom/Notice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const NoticePage = () => {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const getNoticeList = async () => {
    try {
      const response = await api.get("/cal/v1/notice/list");
      return response.data.body;
    } catch (error) {
      if (axios.isAxiosError(error))
        handleOpenErrorModal(error.response?.data.message);
    }
  };

  const handleOpenErrorModal = (errorMessage: string) => {
    setErrorMessage(errorMessage);
    setIsErrorModalOpen(true);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const { data: noticeList, isLoading } = useQuery<NoticeResponse>(
    ["NoticeList"],
    getNoticeList,
    {
      refetchOnWindowFocus: false,
    }
  );

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = noticeList
    ? noticeList.notice.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const totalPages = Math.ceil((noticeList?.notice.length || 0) / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const filteredItems = currentItems.filter((item: NoticeItem) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return item.title.toLowerCase().includes(lowerCaseSearchTerm);
  });

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Container maxWidth="xl" sx={{ minHeight: "880px" }}>
        <Banner item="Q&A" />
        <div style={{ display: "flex" }}>
          <Search sx={{ marginBottom: "5px" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search ..."
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={handleSearch}
            />
          </Search>
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
                <TableCell align="right">제목</TableCell>
                <TableCell align="right">작성일자</TableCell>
                <TableCell align="right">사용자 ID</TableCell>
                <TableCell align="right">조회수</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((row: NoticeItem, index: number) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell scope="row">{row.id}</TableCell>

                  <TableCell align="right">
                    <NoneStyledLink to={`/notice/${row.id}`}>
                      {row.title}
                    </NoneStyledLink>
                  </TableCell>

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
      <ErrorModal
        open={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default NoticePage;
