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
  items: [];
  totalCount: number;
  totalPages: number;
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
    ["getSearch", page],
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
  ) : (
    <>
      <Container maxWidth="xl" sx={{ paddingBottom: "50px" }}>
        <Banner item="SEARCH" />
        <div style={{ display: "flex", justifyContent: "right" }}>
          <Typography sx={{ marginRight: "10px" }}>총 검색결과</Typography>
          <Typography sx={{ color: "blue" }}>{data?.totalCount}개</Typography>
        </div>
        <Grid container gap={2} sx={{ justifyContent: "center" }}>
          {data?.items.map((item: any) => (
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
                variant="contained"
                onClick={() => handlePageChange(index)}
                disabled={index === page}
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
