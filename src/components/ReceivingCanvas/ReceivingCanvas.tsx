import CanvasDraw from "react-canvas-draw";
import { useRef } from "react";
import { useEffect } from "react";
import styles from "./ReceivingCanvas.module.css";
import useCanvasResize from "../../hooks/useCanvasResize";
import GuessesProvider from "../../context/GuessesContext";

interface ReceivingCanvasProps {
  drawingData: string;
}

const ReceivingCanvas: React.FC<ReceivingCanvasProps> = ({ drawingData }) => {
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<CanvasDraw>(null);
  const canvasSize = useCanvasResize(canvasContainerRef);

  useEffect(() => {
    if (drawingData.length > 1) {
      canvasRef.current?.loadSaveData(drawingData, true);
    }
  }, [drawingData]);

  return (
    <div className={styles.canvasContainer} ref={canvasContainerRef}>
      <CanvasDraw
        disabled={true}
        ref={canvasRef}
        hideInterface={true}
        hideGrid={true}
        canvasWidth={canvasSize.width}
        canvasHeight={canvasSize.height}
      />
      <GuessesProvider></GuessesProvider>
    </div>
  );
};

export default ReceivingCanvas;
