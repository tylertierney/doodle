import { Button } from "@mantine/core";
import CSS from "csstype";
import { forwardRef } from "react";

interface GradientBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth: boolean;
  rightIcon: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
  style?: CSS.Properties;
}
const GradientBtn = forwardRef<HTMLButtonElement, GradientBtnProps>(
  ({ children, fullWidth, rightIcon, onClick, disabled, style }, ref) => {
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
        ref={ref}
      >
        {children}
      </Button>
    );
  }
);

export default GradientBtn;
