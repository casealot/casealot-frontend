import { useQuery } from "@tanstack/react-query";
import Chart from "react-apexcharts";
import { api } from "../../atom/apiCall";
import Loading from "../Useable/Loading";
import { ApexOptions } from "apexcharts";
interface SalesData {
  todaySales: number;
  today: string;
  orderCounts: number;
}

const SalesBoard = () => {
  const { data, isLoading } = useQuery<SalesData[]>(
    ["getSalesData"],
    async () => {
      const response = await api.get("cal/v1/function/sales");
      return response.data.body.function;
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const SalesX = data?.reverse().map((item) => item.today);
  const orderCountsChartOptions: ApexOptions = {
    chart: {
      id: "order-counts",
      type: "line",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: data?.map((item) => item.today),
    },

    colors: ["#008FFB"],
  };

  const todaySalesChartOptions: ApexOptions = {
    chart: {
      id: "today-sales",
      type: "line",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: data?.map((item) => item.today),
    },

    colors: ["#00E396"],
  };

  const orderCountsChartSeries = [
    {
      name: "Order Counts",
      data: data?.map((item) => item.orderCounts),
    },
  ];

  const todaySalesChartSeries = [
    {
      name: "Today Sales",
      data: data?.map((item) => item.todaySales),
    },
  ];

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <div style={{ position: "relative" }}>
        <Chart
          options={orderCountsChartOptions}
          series={orderCountsChartSeries as ApexAxisChartSeries}
          type="line"
          height={220}
        />
        <span
          style={{
            position: "absolute",
            top: 2,
            right: 35,
            fontWeight: 600,
            color: "#008FFB",
            padding: "3px",
          }}
        >
          ORDER
        </span>
      </div>
      <div style={{ position: "relative" }}>
        <Chart
          options={todaySalesChartOptions}
          series={todaySalesChartSeries as ApexAxisChartSeries}
          type="line"
          height={220}
        />
        <span
          style={{
            position: "absolute",
            top: 2,
            right: 35,
            fontWeight: 600,
            color: "#00E396",
            padding: "3px",
          }}
        >
          SALES
        </span>
      </div>
    </div>
  );
};
export default SalesBoard;
