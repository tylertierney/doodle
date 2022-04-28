import CanvasDraw from "react-canvas-draw";
import { RefObject, useRef } from "react";
import socket from "../../socket";
import { useGame } from "../../context/GameContext";
import { useEffect } from "react";
import { getLocalStorage } from "../../utils/utils";
import { useState } from "react";
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
  const { turns, currentPlayer } = useGame();
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

  return (
    <div className={styles.canvasContainer} ref={canvasContainerRef}>
      <CanvasDraw
        ref={canvasRef}
        brushColor={brushColor}
        brushRadius={brushRadius}
        catenaryColor={brushColor}
        lazyRadius={0}
        onChange={(e) => socket.emit("draw", e.getSaveData())}
        immediateLoading={true}
        canvasWidth={canvasSize.width}
        canvasHeight={canvasSize.height}
        hideGrid={true}
      />
      <GuessesProvider></GuessesProvider>
    </div>
  );
};

export default Canvas;
