import { Container, Typography } from "@mui/material";
import banner from "../../dummy/img/banner.jpg";

type bannerProps = {
  item: string;
};
const Banner: React.FC<bannerProps> = ({ item }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "180px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center" /* 기타 배경 이미지 스타일을 설정합니다 */,
        color: "#fff",
        textAlign: "center",
        margin: "60px 0",
      }}
    >
      <Typography variant="h3">{item}</Typography>
    </div>
  );
};

export default Banner;
