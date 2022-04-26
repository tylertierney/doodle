import CanvasDraw from "react-canvas-draw";
import { RefObject, useRef } from "react";
import socket from "../../socket";
import { useGame } from "../../context/GameContext";
import { useEffect } from "react";
import { getLocalStorage } from "../../utils/utils";
import { useState } from "react";

interface CanvasProps {
  brushRadius: number;
  brushColor: string;
  canvasRef: RefObject<CanvasDraw>;
}

const Canvas: React.FC<CanvasProps> = ({
  brushRadius,
  brushColor,
  canvasRef,
}) => {
  const { turns, currentPlayer } = useGame();
  // const canvasRef = useRef<CanvasDraw>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const [canvasWidth, setCanvasWidth] = useState(400);
  const [canvasHeight, setCanvasHeight] = useState(400);

  useEffect(() => {
    const existingGame = getLocalStorage();
    if (existingGame && existingGame.turns.length > 0) {
      const drawingData = existingGame.turns[turns.length - 1].drawing;
      if (canvasRef.current && drawingData) {
        canvasRef.current.loadSaveData(drawingData);
      }
    }
  }, [canvasRef.current, currentPlayer]);

  useEffect(() => {
    if (canvasContainerRef.current) {
      const rect = canvasContainerRef.current.getBoundingClientRect();
      setCanvasWidth(Math.floor(rect.width));
      setCanvasHeight(Math.floor(rect.height));
    }
  }, [canvasContainerRef.current]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (canvasContainerRef.current) {
        const rect = canvasContainerRef.current.getBoundingClientRect();
        setCanvasWidth(Math.floor(rect.width));
        setCanvasHeight(Math.floor(rect.height));
      }
    });
  }, []);

  return (
    <div
      style={{
        borderRadius: "10px",
        backgroundColor: "white",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        flexGrow: 1,
      }}
      ref={canvasContainerRef}
    >
      <CanvasDraw
        ref={canvasRef}
        brushColor={brushColor}
        brushRadius={brushRadius}
        catenaryColor={brushColor}
        lazyRadius={0}
        onChange={(e) => socket.emit("draw", e.getSaveData())}
        immediateLoading={true}
        canvasHeight={canvasHeight}
        canvasWidth={canvasWidth}
      />
    </div>
  );
};

export default Canvas;
