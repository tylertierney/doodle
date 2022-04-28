import { Dispatch, FormEvent, SetStateAction } from "react";
import styles from "./CanvasToolbar.module.css";
import { FaTrashAlt, FaUndo, FaEraser } from "react-icons/fa";
import { Button } from "@mantine/core";
import { useState } from "react";
import socket from "../../../socket";
import { useGame } from "../../../context/GameContext";

interface CanvasToolbarProps {
  brushRadius: number;
  setBrushRadius: Dispatch<SetStateAction<number>>;
  brushColor: string;
  setBrushColor: Dispatch<SetStateAction<string>>;
  clearCanvas: () => void;
  undo: () => void;
  isArtist: boolean;
}

const CanvasToolbar: React.FC<CanvasToolbarProps> = ({
  brushRadius,
  setBrushRadius,
  brushColor,
  setBrushColor,
  clearCanvas,
  undo,
  isArtist,
}) => {
  const { currentPlayer } = useGame();
  const brushes = [6, 8, 10, 12, 14].map((radius: number, idx: number) => {
    const isSelected = radius === brushRadius;
    return (
      <div
        key={idx}
        className={styles.brush}
        style={{
          width: `${Math.floor(radius * 2.5)}px`,
          height: `${Math.floor(radius * 2.5)}px`,
          border: isSelected ? `3px solid ${brushColor}` : "none",
        }}
        onClick={() => setBrushRadius(radius)}
      ></div>
    );
  });

  const colors = [
    "#ff604c",
    "blue",
    "#26eca8",
    "gold",
    "#00c4ff",
    "orange",
    "purple",
    "#6158df",
    "brown",
    "black",
  ].map((color: string, idx: number) => {
    const isSelected = color === brushColor;
    return (
      <div
        key={idx}
        style={{
          backgroundColor: color,
        }}
        className={`${styles.colorBlotch} ${isSelected && styles.selected}`}
        onClick={() => setBrushColor(color)}
      ></div>
    );
  });

  const artistTools = (
    <>
      <div className={styles.brushesContainer}>{brushes}</div>
      <div className={styles.controlsContainer}>
        <button onClick={() => undo()} className={styles.controlBtn}>
          <FaUndo fontSize="1.5rem" />
        </button>
        <button
          onClick={() => setBrushColor("#fcfcfc")}
          className={styles.controlBtn}
        >
          <FaEraser fontSize="1.7rem" />
        </button>
        <button onClick={() => clearCanvas()} className={styles.controlBtn}>
          <FaTrashAlt fontSize="1.5rem" />
        </button>
      </div>
      <div className={styles.paletteContainer}>{colors}</div>
    </>
  );

  const [guess, setGuess] = useState("");

  const handleGuessSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const guessObj = {
      nickname: currentPlayer?.nickname,
      text: guess,
    };
    socket.emit("guess", guessObj);
    setGuess("");
  };

  const guesserTools = (
    <div className={styles.guessInputContainer}>
      <form onSubmit={(e) => handleGuessSubmit(e)}>
        <input
          onChange={(e) => setGuess(e.target.value)}
          value={guess}
          type="text"
          className={styles.guessInput}
        />
      </form>
    </div>
  );

  return (
    <div className={styles.toolbarContainer}>
      {isArtist ? artistTools : guesserTools}
    </div>
  );
};

export default CanvasToolbar;
