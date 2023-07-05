import React from "react";
import {
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Typography,
} from "@mui/material";
import CenterAlignedCell from "../Useable/CenterAlignedCell";
import { NoneStyledLink } from "../Useable/Link";
import ready from "../../dummy/img/noimage.gif";
export type OrderList = {
  address: string;
  addressDetail: string;
  customerId: string;
  deliveryNumber: null | string;
  email: string;
  id: number;
  name: string;
  orderDt: string;
  orderNumber: string;
  orderStatus: string;
  phoneNumber: null | string;
  totalAmount: number;
  orderProducts: orderProducts[];
};

type orderProducts = {
  customerSeq: number;
  name: string;
  price: number;
  productId: number;
  quantity: number;
  thumbnail: string;
};

type Props = {
  orders: OrderList[];
};

const AdminOrderTable: React.FC<Props> = ({ orders }) => (
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
        {orders.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5}>
              <Typography variant="body1" sx={{ marginX: "auto" }}>
                내역이 없습니다.
              </Typography>
            </TableCell>
          </TableRow>
        ) : (
          orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <NoneStyledLink to={`/mypage/order/${order.id}`}>
                  <div style={{ display: "flex" }}>
                    {order.orderProducts[0]?.thumbnail === null ? (
                      <img
                        src={ready}
                        width="100%"
                        height="100%"
                        style={{
                          maxWidth: "100px",
                          maxHeight: "100px",
                        }}
                        alt="thumbnail"
                      />
                    ) : (
                      <img
                        src={order.orderProducts[0]?.thumbnail}
                        width="100%"
                        height="100%"
                        style={{
                          maxWidth: "100px",
                          maxHeight: "100px",
                          minHeight: "100px",
                        }}
                        alt="thumbnail"
                      />
                    )}
                    <div style={{ margin: "auto 0", marginLeft: "20px" }}>
                      {order.orderProducts[0]?.name}
                    </div>
                  </div>
                </NoneStyledLink>
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
                {order.orderStatus === "CANCEL"
                  ? "취소완료"
                  : order.orderStatus === "COMPLETE"
                  ? "결제완료"
                  : order.orderStatus}
                <br />
              </CenterAlignedCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default AdminOrderTable;
