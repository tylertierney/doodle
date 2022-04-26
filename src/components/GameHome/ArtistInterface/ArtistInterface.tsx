import { useState } from "react";
import { FC } from "react";
import Canvas from "../../Canvas/Canvas";
import Letters from "../Letters/Letters";
import styles from "./ArtistInterface.module.css";
import CanvasToolbar from "./CanvasToolbar/CanvasToolbar";

interface ArtistInterfaceProps {
  wordToDraw: string[];
}

const ArtistInterface: FC<ArtistInterfaceProps> = ({ wordToDraw }) => {
  const [brushRadius, setBrushRadius] = useState(8);
  const [brushColor, setBrushColor] = useState("blue");

  return (
    <div
      className={styles.artistInterfaceContainer}
      data-testid="ArtistInterface"
    >
      <div className={styles.wordToDrawContainer}>
        <Letters wordToDraw={wordToDraw} />
      </div>
      <Canvas brushRadius={brushRadius} brushColor={brushColor} />
      <CanvasToolbar
        brushRadius={brushRadius}
        setBrushRadius={setBrushRadius}
        brushColor={brushColor}
        setBrushColor={setBrushColor}
      />
    </div>
  );
};

export default ArtistInterface;
