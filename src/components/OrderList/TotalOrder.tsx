import { useQuery } from "@tanstack/react-query";
import { api } from "../../atom/apiCall";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const TotalOrder = () => {
  const { data, isLoading } = useQuery(["getOrderList"], async () => {
    const response = await api.get("cal/v1/order/all");
    return response.data.body.function;
  });
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Header 1</TableCell>
              <TableCell>Header 2</TableCell>
              <TableCell>Header 3</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Cell 1</TableCell>
              <TableCell>Cell 2</TableCell>
              <TableCell>Cell 3</TableCell>
            </TableRow>
            {/* Add more rows here */}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TotalOrder;
