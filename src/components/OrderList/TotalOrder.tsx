import { useQuery } from "@tanstack/react-query";
import { api } from "../../atom/apiCall";

import ready from "../../dummy/img/noimage.gif";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";

interface OrderProduct {
  name: string;
  price: number;
  productId: number;
  quantity: number;
  thumbnail: string;
}

interface Order {
  address: string;
  addressDetail: string;
  customerId: string;
  email: string;
  id: number;
  name: string;
  orderDt: string;
  orderNumber: string;
  orderProducts: OrderProduct[];
  orderStatus: string;
  phoneNumber: string;
  totalAmount: number;
}
const CenterAlignedCell = styled(TableCell)`
  text-align: center;
`;
const TotalOrder = () => {
  const { data, isLoading } = useQuery<Order[]>(["getOrderList"], async () => {
    const response = await api.get("cal/v1/order/all");
    return response.data.body.order;
  });
  return (
    <>
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
              data?.map((order) => (
                <TableRow key={order.orderNumber}>
                  <TableCell>
                    {order.orderProducts.length > 0 && (
                      <div style={{ display: "flex" }}>
                        {order.orderProducts[0].thumbnail === null ? (
                          <img
                            src={ready}
                            width="100%"
                            height="100%"
                            style={{
                              maxWidth: "100px",
                              maxHeight: "100px",
                            }}
                          />
                        ) : (
                          <img
                            src={order.orderProducts[0].thumbnail}
                            width="100%"
                            height="100%"
                            style={{
                              maxWidth: "100px",
                              maxHeight: "100px",
                              minHeight: "100px",
                            }}
                          />
                        )}
                        <div style={{ margin: "auto 0", marginLeft: "20px" }}>
                          {order.orderProducts[0].name}
                        </div>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{order.orderDt}</TableCell>
                  <TableCell>{order.orderNumber}</TableCell>
                  <CenterAlignedCell>
                    <Typography sx={{ fontWeight: 600 }}>
                      {order.totalAmount}원
                    </Typography>
                    <Typography>{order.orderProducts.length}개</Typography>
                  </CenterAlignedCell>
                  <CenterAlignedCell>
                    {order.orderStatus} <br /> <Button>배송조회</Button>
                  </CenterAlignedCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TotalOrder;
