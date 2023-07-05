import { useQuery } from "@tanstack/react-query";
import { api } from "../../atom/apiCall";
import Loading from "../Useable/Loading";
import AdminOrderTable, { OrderList } from "./AdminOrderTable";

const AdminOrderChange = () => {
  const getOrderListChange = async () => {
    const response = await api.get("cal/v1/function/all/CHANGE");
    return response.data.body.function;
  };

  const { data, isLoading } = useQuery<OrderList[]>(
    ["getOrderListAll"],
    getOrderListChange
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

export default AdminOrderChange;
