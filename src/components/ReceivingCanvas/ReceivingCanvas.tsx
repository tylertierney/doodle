import CanvasDraw from "react-canvas-draw";
import { useRef } from "react";
import { useEffect } from "react";

interface ReceivingCanvasProps {
  drawingData: string;
}

const ReceivingCanvas: React.FC<ReceivingCanvasProps> = ({ drawingData }) => {
  const canvasRef = useRef<CanvasDraw>(null);

  useEffect(() => {
    if (drawingData.length > 1) {
      canvasRef.current?.loadSaveData(drawingData, true);
    }
  }, [drawingData]);

  return <CanvasDraw disabled={true} ref={canvasRef} />;
};

export default ReceivingCanvas;
