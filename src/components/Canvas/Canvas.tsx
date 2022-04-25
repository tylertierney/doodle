import CanvasDraw from "react-canvas-draw";
import { useRef } from "react";
import socket from "../../socket";
import { useGame } from "../../context/GameContext";
import { useEffect } from "react";
import { getLocalStorage } from "../../utils/utils";

const Canvas: React.FC = () => {
  const { ipAddress, turns, currentPlayer } = useGame();
  const canvasRef = useRef<CanvasDraw>(null);

  const sendDrawingToWebsocket = () => {
    const drawingData = canvasRef.current?.getSaveData();
    socket.emit("draw", drawingData);
  };

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
          brushColor="green"
          brushRadius={3}
          lazyRadius={0}
          onChange={(e) => socket.emit("draw", e.getSaveData(), ipAddress)}
          immediateLoading={true}
        />
      </div>
      <button onClick={() => sendDrawingToWebsocket()}>test</button>
      <button onClick={() => console.log(turns)}>test2</button>
    </div>
  );
};

export default Canvas;
