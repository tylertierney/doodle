import CanvasDraw from "react-canvas-draw";
import { useRef } from "react";
import socket from "../../socket";
import { useGame } from "../../context/GameContext";

const Canvas: React.FC = () => {
  const { ipAddress, turns } = useGame();
  const canvasRef = useRef<CanvasDraw>(null);

  const sendDrawingToWebsocket = () => {
    const drawingData = canvasRef.current?.getSaveData();
    socket.emit("draw", drawingData, ipAddress);
  };

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
        />
      </div>
      <button onClick={() => sendDrawingToWebsocket()}>test</button>
      <button onClick={() => console.log(turns)}>test2</button>
    </div>
  );
};

export default Canvas;
