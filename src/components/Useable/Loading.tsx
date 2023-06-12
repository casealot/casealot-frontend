import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";

const Loading = () => {
  return (
    <Container sx={{ height: "500px" }}>
      <Box sx={{ display: "flex" }}>
        <CircularProgress sx={{ marginX: "auto", marginTop: "300px" }} />
      </Box>
    </Container>
  );
};

export default Loading;
