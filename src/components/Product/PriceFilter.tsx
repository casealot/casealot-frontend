import { Button } from "@mui/material";

interface PriceFilterButtonsProps {
  selectedPrice: string;
  onPriceSelect: (price: string) => void;
}

const PriceFilterButtons = ({
  selectedPrice,
  onPriceSelect,
}: PriceFilterButtonsProps) => {
  const priceOptions = [
    { label: "~3만원", value: "30000" },
    { label: "3~5만원", value: "30000-50000" },
    { label: "5~10만원", value: "50000-100000" },
    { label: "10만원~", value: "100000" },
  ];

  return (
    <>
      {priceOptions.map((option) => (
        <Button
          key={option.label}
          variant={selectedPrice === option.value ? "contained" : "outlined"}
          onClick={() => onPriceSelect(option.value)}
          sx={{ border: "none", marginRight: "5px" }}
        >
          {option.label}
        </Button>
      ))}
    </>
  );
};

export default PriceFilterButtons;
