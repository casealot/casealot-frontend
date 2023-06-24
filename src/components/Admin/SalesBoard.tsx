import { useQuery } from "@tanstack/react-query";
import Chart from "react-apexcharts";
import { api } from "../../atom/apiCall";
import Loading from "../Useable/Loading";
interface SalesData {
  todaySales: number;
  today: string;
}

const SalesBoard = () => {
  const { data, isLoading } = useQuery<SalesData[]>(
    ["getSalesData"],
    async () => {
      const response = await api.get("cal/v1/function/sales");
      console.log(response.data);
      return response.data.body.function;
    }
  );

  const chartData = {
    series: [
      {
        name: "Sales",
        data: data?.map((item) => item.todaySales),
      },
    ],
    options: {
      chart: {
        zoom: {
          enabled: false,
        },
      },

      xaxis: {
        // categories: data?.map((item: any) => item.today),
        // categories: data?.map((item) => item.today),
        categories: [
          "23-06-06",
          "23-06-06",
          "23-06-06",
          "23-06-06",
          "23-06-06",
          "23-06-06",
          "23-06-06",
        ],
      },
    },
  };
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Chart
        options={chartData.options}
        series={chartData.series as ApexAxisChartSeries}
        type="area"
        width="100%"
        height="450px"
      />
    </>
  );
};

export default SalesBoard;
