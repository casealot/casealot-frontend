import { Button } from "@mui/material";

export const colorOptions = [
  { label: "빨강", value: "red" },
  { label: "주황", value: "orange" },
  { label: "노랑", value: "yellow" },
  { label: "파랑", value: "blue" },
  { label: "핑크", value: "pink" },
  { label: "보라", value: "purple" },
  { label: "검정", value: "black" },
  { label: "흰색", value: "white" },
  { label: "초록", value: "green" },
  { label: "기타", value: "other" },
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
  selectedColor,
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
