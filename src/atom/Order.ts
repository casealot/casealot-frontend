import { api } from "./apiCall";

export const apiKey = "zaHSAGHdplY7jwHh6nhD8w";
export const tCode = "04";

export interface OrderProduct {
  name: string;
  price: number;
  productId: number;
  quantity: number;
  thumbnail: string;
}

export interface Order {
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
export const getCompleteOrder = async () => {
  const response = await api.get(`cal/v1/order/list/complete`);
  return response.data.body.order;
};
