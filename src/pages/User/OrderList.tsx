import { Container } from "@mui/joy";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../atom/apiCall";
import Loading from "../../components/Useable/Loading";

const OrderList = () => {
  const { data: orderList, isLoading } = useQuery(
    ["getOrderList"],
    async () => {
      const response = await api.get("cal/v1/order");
      return response.data.body;
    }
  );
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Container maxWidth="xl">
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="blue"
          gutterBottom
          paddingTop={10}
        >
          ORDER LIST
        </Typography>
        <div>아아</div>
      </Container>
    </>
  );
};

export default OrderList;
