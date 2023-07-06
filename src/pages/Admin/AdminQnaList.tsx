import { useQuery } from "@tanstack/react-query";
import { api } from "../../atom/apiCall";
import Loading from "../../components/Useable/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Button,
} from "@mui/material";
import { NoneStyledLink } from "../../components/Useable/Link";

type Qna = {
  id: number;
  customerId: string;
  title: string;
  content: string;
  views: number;
  createdDt: string;
  modifiedDt: string;
};

const AdminQnaList = () => {
  const getQnaList = async () => {
    const response = await api.get("/cal/v1/admin/qna/list");
    console.log(response.data.body);
    return response.data.body.qna;
  };

  const { data, isLoading } = useQuery<Qna[]>(["getQnaList"], getQnaList);

  console.log(data);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Container maxWidth="xl">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Views</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((qna) => (
                <TableRow key={qna.id}>
                  <TableCell>{qna.id}</TableCell>

                  <TableCell>
                    <NoneStyledLink to={`/qna/${qna.id}`}>
                      {qna.title}
                    </NoneStyledLink>
                  </TableCell>

                  <TableCell>
                    <NoneStyledLink to={`/qna/${qna.id}`}>
                      {qna.content}{" "}
                    </NoneStyledLink>
                  </TableCell>

                  <TableCell>{qna.createdDt}</TableCell>
                  <TableCell>{qna.views}</TableCell>
                  <TableCell>
                    <Button>답변하기</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default AdminQnaList;
