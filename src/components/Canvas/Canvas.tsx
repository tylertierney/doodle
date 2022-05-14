import CanvasDraw from "react-canvas-draw";
import { RefObject, useRef, useState } from "react";
import socket from "../../socket";
import { useGame } from "../../context/GameContext";
import { useEffect } from "react";
import { getLocalStorage } from "../../utils/utils";
import styles from "./Canvas.module.css";
import useCanvasResize from "../../hooks/useCanvasResize";
import GuessesProvider from "../../context/GuessesContext";

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
  const { turns, currentPlayer, roomCode } = useGame();
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const canvasSize = useCanvasResize(canvasContainerRef);

  useEffect(() => {
    const existingGame = getLocalStorage();
    if (existingGame && existingGame.turns.length > 0) {
      const drawingData = existingGame.turns[turns.length - 1].drawing;
      if (canvasRef.current && drawingData) {
        canvasRef.current.loadSaveData(drawingData);
      }
    }
  }, [canvasRef.current, currentPlayer]);

  const hideBrush = window.innerWidth < 430 ? true : false;

  return (
    <div
      className={styles.canvasContainer}
      ref={canvasContainerRef}
      onMouseLeave={(e) => console.log(e)}
    >
      <CanvasDraw
        ref={canvasRef}
        brushColor={brushColor}
        brushRadius={brushRadius}
        catenaryColor={brushColor}
        lazyRadius={0}
        onChange={(e) => socket.emit("draw", e.getSaveData(), roomCode)}
        immediateLoading={true}
        canvasWidth={canvasSize.width}
        canvasHeight={canvasSize.height}
        hideGrid={true}
        hideInterface={hideBrush}
      />
      <GuessesProvider></GuessesProvider>
    </div>
  );
};

export default Canvas;
