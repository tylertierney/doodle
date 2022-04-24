import { Button } from "@mantine/core";

interface GradientBtnProps {
  fullWidth: boolean;
  rightIcon: React.ReactNode;
  onClick: () => void;
}
const GradientBtn: React.FC<GradientBtnProps> = ({
  children,
  fullWidth,
  rightIcon,
  onClick,
}) => {
  return (
    <Button
      variant="gradient"
      gradient={{ from: "orange", to: "yellow" }}
      size="lg"
      radius="md"
      fullWidth={fullWidth}
      rightIcon={rightIcon}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default GradientBtn;
