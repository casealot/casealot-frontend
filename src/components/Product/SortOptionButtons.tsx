import { Typography, Button } from "@mui/material";

interface SortOptionButtons {
  sortOption: string;
  sortOrder: string;
  handleSortChange: (option: string) => void;
}

const SortOptionButtons = ({
  sortOption,
  sortOrder,
  handleSortChange,
}: SortOptionButtons) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "left",
        margin: "20px 0",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "20px",
          marginY: "auto",
          fontWeight: "600",
          marginRight: "20px",
        }}
      >
        정렬
      </Typography>
      <Button
        variant={sortOption === "wishCount" ? "contained" : "outlined"}
        onClick={() => handleSortChange("wishCount")}
        sx={{ border: "none" }}
      >
        찜한순 {sortOption === "wishCount" && sortOrder === "desc" && "▼"}
        {sortOption === "wishCount" && sortOrder === "asc" && "▲"}
      </Button>
      <Button
        variant={sortOption === "price" ? "contained" : "outlined"}
        onClick={() => handleSortChange("price")}
        sx={{ border: "none" }}
      >
        가격순 {sortOption === "price" && sortOrder === "desc" && "▼"}
        {sortOption === "price" && sortOrder === "asc" && "▲"}
      </Button>
      <Button
        variant={sortOption === "sale" ? "contained" : "outlined"}
        onClick={() => handleSortChange("sale")}
        sx={{ border: "none" }}
      >
        할인율순 {sortOption === "sale" && sortOrder === "desc" && "▼"}
        {sortOption === "sale" && sortOrder === "asc" && "▲"}
      </Button>
      <Button
        variant={sortOption === "sells" ? "contained" : "outlined"}
        onClick={() => handleSortChange("sells")}
        sx={{ border: "none" }}
      >
        판매순 {sortOption === "sells" && sortOrder === "desc" && "▼"}
        {sortOption === "sells" && sortOrder === "asc" && "▲"}
      </Button>
      <Button
        variant={sortOption === "rating" ? "contained" : "outlined"}
        onClick={() => handleSortChange("rating")}
        sx={{ border: "none" }}
      >
        평점순 {sortOption === "rating" && sortOrder === "desc" && "▼"}
        {sortOption === "rating" && sortOrder === "asc" && "▲"}
      </Button>
      <Button
        variant={sortOption === "ratingCount" ? "contained" : "outlined"}
        onClick={() => handleSortChange("ratingCount")}
        sx={{ border: "none" }}
      >
        리뷰순 {sortOption === "ratingCount" && sortOrder === "desc" && "▼"}
        {sortOption === "ratingCount" && sortOrder === "asc" && "▲"}
      </Button>
    </div>
  );
};

export default SortOptionButtons;
