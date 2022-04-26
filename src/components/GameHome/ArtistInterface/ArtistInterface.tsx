import { useRef } from "react";
import { useState } from "react";
import { FC } from "react";
import CanvasDraw from "react-canvas-draw";
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

  const canvasRef = useRef<CanvasDraw>(null);

  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
  };

  const undo = () => {
    if (canvasRef.current) {
      canvasRef.current.undo();
    }
  };

  return (
    <div
      className={styles.artistInterfaceContainer}
      data-testid="ArtistInterface"
    >
      <div className={styles.wordToDrawContainer}>
        <Letters wordToDraw={wordToDraw} />
      </div>
      <Canvas
        brushRadius={brushRadius}
        brushColor={brushColor}
        canvasRef={canvasRef}
      />
      <CanvasToolbar
        brushRadius={brushRadius}
        setBrushRadius={setBrushRadius}
        brushColor={brushColor}
        setBrushColor={setBrushColor}
        clearCanvas={clearCanvas}
        undo={undo}
      />
    </div>
  );
};

export default ArtistInterface;
