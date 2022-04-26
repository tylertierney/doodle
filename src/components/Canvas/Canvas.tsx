import CanvasDraw from "react-canvas-draw";
import { useRef } from "react";
import socket from "../../socket";
import { useGame } from "../../context/GameContext";
import { useEffect } from "react";
import { getLocalStorage } from "../../utils/utils";

interface CanvasProps {
  brushRadius: number;
  brushColor: string;
}

const Canvas: React.FC<CanvasProps> = ({ brushRadius, brushColor }) => {
  const { turns, currentPlayer } = useGame();
  const canvasRef = useRef<CanvasDraw>(null);

  useEffect(() => {
    const existingGame = getLocalStorage();
    if (existingGame && existingGame.turns.length > 0) {
      const drawingData = existingGame.turns[turns.length - 1].drawing;
      if (canvasRef.current && drawingData) {
        canvasRef.current.loadSaveData(drawingData);
      }
    }
  }, [canvasRef.current, currentPlayer]);

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
          ref={canvasRef}
          brushColor={brushColor}
          brushRadius={brushRadius}
          catenaryColor={brushColor}
          lazyRadius={0}
          onChange={(e) => socket.emit("draw", e.getSaveData())}
          immediateLoading={true}
        />
      </div>
      <button onClick={() => console.log(turns)}>turns</button>
    </div>
  );
};

export default Canvas;
