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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartData: any = {
    series: [
      {
        name: "Sales",
        data: data?.map((item) => item.todaySales),
      },
    ],
    options: {
      chart: {
        type: "area",
      },
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      stroke: {
        curve: "smooth",
      },

      dataLabels: {
        enabled: false,
      },

      xaxis: {
        categories: data?.map((item) => item.today),
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
        height={450}
      />
    </>
  );
};

export default SalesBoard;
