import { Button } from "@mantine/core";
import CSS from "csstype";

interface GradientBtnProps {
  fullWidth: boolean;
  rightIcon: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
  style?: CSS.Properties;
}
const GradientBtn: React.FC<GradientBtnProps> = ({
  children,
  fullWidth,
  rightIcon,
  onClick,
  disabled,
  style,
}) => {
  return (
    <Button
      variant="gradient"
      gradient={{ from: "var(--orangered)", to: "var(--lightorange)" }}
      size="lg"
      radius="md"
      fullWidth={fullWidth}
      rightIcon={rightIcon}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default GradientBtn;
