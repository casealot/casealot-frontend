import { useQuery } from "@tanstack/react-query";
import { api } from "../../atom/apiCall";
import Loading from "../Useable/Loading";
import AdminOrderTable from "./AdminOrderTable";

type OrderList = {
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

const AdminOrderComplete = () => {
  const getOrderListChange = async () => {
    const response = await api.get("cal/v1/function/all/COMPLETE");
    return response.data.body.function;
  };

  const { data, isLoading } = useQuery<OrderList[]>(
    ["getOrderListAll"],
    getOrderListChange
  );

  if (isLoading) {
    return <Loading />;
  }

  return isLoading ? (
    <Loading />
  ) : data ? (
    <>
      <AdminOrderTable orders={data} />
    </>
  ) : (
    <></>
  );
};

export default AdminOrderComplete;
