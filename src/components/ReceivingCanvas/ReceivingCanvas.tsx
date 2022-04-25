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

  return (
    <div>
      <div
        style={{
          borderRadius: "10px",
          backgroundColor: "white",
          overflow: "hidden",
        }}
      >
        <CanvasDraw
          disabled={true}
          ref={canvasRef}
          // brushRadius={0}
          // lazyRadius={0}
          hideInterface={true}
          hideGrid={true}
        />
      </div>
    </div>
  );
};

export default ReceivingCanvas;
