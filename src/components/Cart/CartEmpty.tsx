import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import emptyCartImg from "../../dummy/img/empty-cart.png";
const CartEmpty = () => {
  return (
    <>
      <img
        src={emptyCartImg}
        style={{
          maxWidth: "400px",
          margin: "30px 70px 10px 0",
        }}
      />
      <Typography variant="body1" sx={{ marginTop: "20px", fontSize: "28px" }}>
        텅
      </Typography>
      <Link to="/">
        <Button
          variant="contained"
          size="large"
          sx={{
            width: "220px",
            marginLeft: "auto",
            fontSize: "16px",
            fontWeight: "500",
            color: "#fff",
            borderColor: "#000",
            backgroundColor: "#000",
            marginY: "10px",
          }}
        >
          구매하러 가기
        </Button>
      </Link>
    </>
  );
};

export default CartEmpty;
