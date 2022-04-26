import { Dispatch, SetStateAction } from "react";
import styles from "./CanvasToolbar.module.css";

interface CanvasToolbarProps {
  brushRadius: number;
  setBrushRadius: Dispatch<SetStateAction<number>>;
  brushColor: string;
  setBrushColor: Dispatch<SetStateAction<string>>;
}

const CanvasToolbar: React.FC<CanvasToolbarProps> = ({
  brushRadius,
  setBrushRadius,
  brushColor,
  setBrushColor,
}) => {
  const brushes = [6, 8, 10, 12, 14].map((radius: number, idx: number) => {
    return (
      <div
        key={idx}
        style={{
          width: `${Math.floor(radius * 2.5)}px`,
          height: `${Math.floor(radius * 2.5)}px`,
          borderRadius: "50%",
          border:
            radius === brushRadius ? "3px solid orange" : "solid black 1px",
          outline: radius === brushRadius ? "2px solid white" : "",
          cursor: "pointer",
        }}
        onClick={() => setBrushRadius(radius)}
      ></div>
    );
  });

  const colors = [
    "red",
    "blue",
    "green",
    "gold",
    "orange",
    "purple",
    "black",
    "gray",
  ].map((color: string, idx: number) => {
    return (
      <div
        key={idx}
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          backgroundColor: color,
          outline: color === brushColor ? "2px solid white" : "",
          cursor: "pointer",
        }}
        onClick={() => setBrushColor(color)}
      ></div>
    );
  });

  return (
    <div className={styles.toolbarContainer}>
      <div className={styles.brushesContainer}>{brushes}</div>
      <div className={styles.paletteContainer}>{colors}</div>
    </div>
  );
};

export default CanvasToolbar;
