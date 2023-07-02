import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../atom/apiCall";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Useable/Loading";
import { NoneStyledLink } from "../../components/Useable/Link";
import CenterAlignedCell from "../../components/Useable/CenterAlignedCell";
import ready from "../../dummy/img/noimage.gif";

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const { data, isLoading } = useQuery(["getOrderDetail"], async () => {
    const response = await api.get(`cal/v1/order/${id}`);
    return response.data.body.order;
  });

  const handleOrderCancel = async () => {
    try {
      const response = await api.post(`/cal/v1/order/${id}/cancel`);

      if (response) {
        const res = await api.post(
          `/cal/v1/verifyIamport/cancel/${data?.orderNumber}`
        );
        if (res) {
          navigate("/mypage/orderlist");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Container maxWidth="xl" sx={{ minHeight: "800px" }}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="blue"
          gutterBottom
          paddingTop={10}
          marginBottom={13}
        >
          ORDER DETAIL
        </Typography>
        <div
          style={{
            display: "flex",
            borderBottom: "3px solid #000",
            paddingBottom: "30px",
          }}
        >
          <Typography
            sx={{ marginRight: "20px", fontWeight: "600", marginY: "auto" }}
          >
            주문번호 {data?.orderNumber}
          </Typography>
          <Typography sx={{ fontWeight: "600", marginY: "auto" }}>
            주문일자 {data?.orderDt}
          </Typography>
          <Button
            variant="contained"
            onClick={handleOrderCancel}
            sx={{
              marginLeft: "auto",
              backgroundColor: "#fff",
              color: "#808080",
            }}
          >
            주문 취소하기
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>상품정보</TableCell>
                <TableCell>주문일자</TableCell>
                <TableCell>주문번호</TableCell>
                <CenterAlignedCell>주문금액(수량)</CenterAlignedCell>
                <CenterAlignedCell>주문상태</CenterAlignedCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5}>Loading...</TableCell>
                </TableRow>
              ) : (
                data?.orderProducts.map((order: any) => (
                  <TableRow key={order.orderNumber}>
                    <TableCell>
                      <NoneStyledLink to={`/products/${order.productId}`}>
                        <div style={{ display: "flex" }}>
                          {order.thumbnail ? (
                            <img
                              src={order.thumbnail}
                              width="100%"
                              height="100%"
                              style={{
                                maxWidth: "100px",
                                maxHeight: "100px",
                                minHeight: "100px",
                              }}
                            />
                          ) : (
                            <img
                              src={ready}
                              width="100%"
                              height="100%"
                              style={{
                                maxWidth: "100px",
                                maxHeight: "100px",
                              }}
                            />
                          )}

                          <div style={{ margin: "auto 0", marginLeft: "20px" }}>
                            {order.name}
                          </div>
                        </div>
                      </NoneStyledLink>
                    </TableCell>

                    <TableCell>{order.orderDt}</TableCell>
                    <TableCell>{order.orderNumber}</TableCell>
                    <CenterAlignedCell>
                      <Typography sx={{ fontWeight: 600 }}>
                        {order.price}원
                      </Typography>
                      <Typography>{order.quantity}개</Typography>
                    </CenterAlignedCell>
                    <CenterAlignedCell>
                      <Button>배송조회</Button>
                    </CenterAlignedCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default OrderDetail;
