import { Button } from "@mui/material";

// eslint-disable-next-line react-refresh/only-export-components
export const colorOptions = [
  { label: "빨강", value: "RED" },
  { label: "주황", value: "ORANGE" },
  { label: "노랑", value: "YELLOW" },
  { label: "파랑", value: "BLUE" },
  { label: "핑크", value: "PINK" },
  { label: "보라", value: "PURPLE" },
  { label: "검정", value: "BLACK" },
  { label: "흰색", value: "WHITE" },
  { label: "초록", value: "GREEN" },
  { label: "베이지", value: "BEIGE" },
  { label: "하늘", value: "LIGHTSKYBLUE" },
  { label: "카키", value: "OLIVE" },
  { label: "네이비", value: "NAVY" },
  { label: "그레이", value: "GRAY" },
];

interface ColorButtonProps {
  color: string;
  onClick: () => void;
}

const ColorButton = ({ color, onClick }: ColorButtonProps) => {
  return (
    <Button
      sx={{
        width: "30px",
        height: "30px",
        minWidth: "unset",
        backgroundColor: color,
        margin: "5px",
        marginX: "7px",
        border: "1px solid #d3d3d3",
      }}
      onClick={onClick}
    />
  );
};

export const ColorFilterButtons = ({
  onColorSelect,
}: {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}) => {
  return (
    <div>
      {colorOptions.map((colorOption) => (
        <ColorButton
          key={colorOption.label}
          color={colorOption.value}
          onClick={() => onColorSelect(colorOption.value)}
        />
      ))}
    </div>
  );
};
