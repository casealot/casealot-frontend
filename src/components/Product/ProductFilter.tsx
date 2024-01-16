import { Typography, Chip, Button } from "@mui/material";
import { Container } from "@mui/system";

import PriceFilterButtons from "../../components/Product/PriceFilter";
import SortOptionButtons from "../../components/Product/SortOptionButtons";

import Banner from "../../components/Useable/Banner";

import { ColorFilterButtons } from "../../components/Product/ColorPicker";

interface ProductFilterProps {
  category: string;
  selectedColor: string;
  handleColorSelect: (color: string) => void;
  selectedPrice: string;
  handlePriceSelect: (price: string) => void;
  sortOption: string;
  sortOrder: string;
  handleSortChange: (option: string) => void;
  removeColorFilter: () => void;
  removePriceFilter: () => void;
  removeFilters: () => void;
}

export default function ProductFilter({
  category,
  selectedColor,
  handleColorSelect,
  selectedPrice,
  handlePriceSelect,
  sortOption,
  sortOrder,
  handleSortChange,
  removeColorFilter,
  removePriceFilter,
  removeFilters,
}: ProductFilterProps) {
  return (
    <Container maxWidth="xl">
      <Banner item={category ? category.toLocaleUpperCase() : ""} />
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          margin: "20px 0",
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
          색상
        </Typography>
        <ColorFilterButtons
          selectedColor={selectedColor}
          onColorSelect={handleColorSelect}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "left",
          margin: "20px 0",
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
          가격
        </Typography>
        <PriceFilterButtons
          selectedPrice={selectedPrice}
          onPriceSelect={handlePriceSelect}
        />
      </div>
      <SortOptionButtons
        sortOption={sortOption}
        sortOrder={sortOrder}
        handleSortChange={handleSortChange}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          margin: "20px 0",
          paddingBottom: "50px",
          alignItems: "center",
          borderBottom: "1px solid #d3d3d3",
        }}
      >
        {selectedColor || selectedPrice ? (
          <>
            <Typography
              sx={{
                fontSize: "20px",
                marginY: "auto",
                fontWeight: "600",
                marginRight: "20px",
              }}
            >
              필터
            </Typography>
            {selectedColor && (
              <Chip
                label={`색상: ${selectedColor}`}
                onDelete={removeColorFilter}
                color="secondary"
                size="small"
                sx={{ marginRight: "10px" }}
              />
            )}
            {selectedPrice && (
              <Chip
                label={`가격: ${selectedPrice}`}
                onDelete={removePriceFilter}
                color="secondary"
                size="small"
                sx={{ marginRight: "10px" }}
              />
            )}
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={removeFilters}
            >
              모든 필터 삭제
            </Button>
          </>
        ) : (
          ""
        )}
      </div>
    </Container>
  );
}
