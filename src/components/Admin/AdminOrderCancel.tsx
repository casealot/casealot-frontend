import { useQuery } from "@tanstack/react-query";
import { api } from "../../atom/apiCall";
import Loading from "../Useable/Loading";
import AdminOrderTable, { OrderList } from "./AdminOrderTable";

const AdminOrderCancel = () => {
  const getOrderListCancle = async () => {
    const response = await api.get("cal/v1/function/all/CANCEL");
    return response.data.body.function;
  };

  const { data, isLoading } = useQuery<OrderList[]>(
    ["getOrderListCancel"],
    getOrderListCancle
  );

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

export default AdminOrderCancel;
