import { useParams } from "react-router-dom";
import { api } from "../atom/apiCall";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Useable/Loading";
import { useEffect, useState } from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import Banner from "../components/Useable/Banner";
import { NoneStyledLink } from "../components/Useable/Link";

type SearchData = {
  count: number;
  items: SearchItems[];
  totalCount: number;
  totalPages: number;
};

type SearchItems = {
  calculatePrice: number;
  category: string;
  color: string;
  content: string;
  createdDt: string;
  id: number;
  modifiedDt: string;
  name: string;
  price: number;
  rating: number;
  ratingCount: number;
  sale: number;
  season: string;
  sells: number;
  thumbnail: {
    createdDt: string;
    fileSize: number;
    fileType: string;
    modifiedDt: string;
    name: string;
    url: string;
    uuid: string;
  };
  type: string;
  wishCount: number;
  wishYn: string;
};
const SearchPage = () => {
  const { keyword } = useParams<{ keyword: string }>();
  const [page, setPage] = useState(0);

  const getSearchData = async (currentPage: number) => {
    const response = await api.post(`/cal/v1/product`, {
      filter: [],
      page: currentPage,
      query: keyword,
      size: 20,
      sort: [],
    });
    return response.data.body.product;
  };

  const { data, isLoading } = useQuery<SearchData>(
    ["getSearch", page, keyword],
    () => getSearchData(page),
    {
      enabled: !!keyword,
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    setPage(0); // Reset current page when the keyword changes
  }, [keyword]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };
  return isLoading ? (
    <Loading />
  ) : data?.totalCount === 0 ? (
    <Container maxWidth="xl" sx={{ minHeight: "600px", paddingTop: "100px" }}>
      <Typography variant="h3" sx={{ marginY: 10 }}>
        No Search Products
      </Typography>
      <NoneStyledLink to="/products/category/all">
        <Button variant="contained">상품 바로가기</Button>
      </NoneStyledLink>
    </Container>
  ) : (
    <>
      <Container maxWidth="xl" sx={{ paddingBottom: "50px" }}>
        <Banner item="SEARCH" />
        <div style={{ display: "flex", justifyContent: "right" }}>
          <Typography sx={{ marginRight: "10px" }}>총 검색결과</Typography>
          <Typography sx={{ color: "blue" }}>{data?.totalCount}개</Typography>
        </div>
        <Grid container gap={2} sx={{ justifyContent: "center" }}>
          {data?.items.map((item) => (
            <Grid item xs={2.5} key={item.id}>
              <NoneStyledLink to={`/products/${item.id}`}>
                <div
                  style={{
                    maxWidth: "300px",
                    maxHeight: "300px",
                  }}
                >
                  <img
                    src={item.thumbnail.url}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      aspectRatio: "1",
                    }}
                  />
                </div>
              </NoneStyledLink>
              <span>{item.name}</span>
            </Grid>
          ))}
        </Grid>
        {data?.totalPages && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            {Array.from({ length: data.totalPages }, (_, index) => (
              <Button
                key={index}
                variant={index === page ? "contained" : "outlined"}
                onClick={() => handlePageChange(index)}
                disabled={index == page}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        )}
      </Container>
    </>
  );
};

export default SearchPage;
