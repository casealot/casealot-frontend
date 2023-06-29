import { useQuery } from "@tanstack/react-query";
import { api } from "../../atom/apiCall";
import { NoneStyledLink } from "../Useable/Link";

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
  Modal,
} from "@mui/material";
import Loading from "../Useable/Loading";
import axios from "axios";
import { useState } from "react";
import { width } from "@mui/system";

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
const apiKey = "zaHSAGHdplY7jwHh6nhD8w";
const tCode = "04";

const TotalOrder = () => {
  const { data, isLoading } = useQuery<Order[]>(["getOrderList"], async () => {
    const response = await api.get("cal/v1/order/list");
    return response.data.body.order;
  });

  const handleViewInvoice = async () => {
    try {
      const response = await axios.post(
        "http://info.sweettracker.co.kr/tracking/5",
        {
          t_key: apiKey,
          t_code: tCode,
          t_invoice: 649994926955,
        },
        {
          params: {
            t_key: apiKey,
            t_code: tCode,
            t_invoice: 649994926955,
          },
        }
      );

      window.open(
        `http://info.sweettracker.co.kr/tracking/5?t_key=${apiKey}&t_code=${tCode}&t_invoice=${649994926955}`,
        "_blank",
        `width=${400}, height=${600}, top=${
          window.innerHeight / 2 - 600 / 2
        }, left=${window.innerWidth / 2 - 400 / 2}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
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
            {data?.map((order) => (
              <TableRow key={order.orderNumber}>
                <TableCell>
                  {order.orderProducts.length > 0 && (
                    <NoneStyledLink to={`/mypage/order/${order.id}`}>
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
                    </NoneStyledLink>
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
                  {order.orderStatus} <br />{" "}
                  <Button onClick={handleViewInvoice}>배송조회</Button>
                </CenterAlignedCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TotalOrder;
