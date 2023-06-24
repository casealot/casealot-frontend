import { useQuery } from "@tanstack/react-query";
import { api } from "../../atom/apiCall";

import ready from "../../dummy/img/noimage.gif";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
              <TableCell>Product Information</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Order Number</TableCell>
              <TableCell>Order Amount & Quantity</TableCell>
              <TableCell>Order Status</TableCell>
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
                  <TableCell>
                    Amount: {order.totalAmount}
                    <br />
                    Quantity: {order.orderProducts.length}
                  </TableCell>
                  <TableCell>{order.orderStatus}</TableCell>
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
