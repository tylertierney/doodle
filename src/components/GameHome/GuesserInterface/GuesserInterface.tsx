import { FC, FormEvent, useState } from "react";
import styles from "./GuesserInterface.module.css";
import Letters from "../Letters/Letters";
import ReceivingCanvas from "../../ReceivingCanvas/ReceivingCanvas";
import CanvasToolbar from "../CanvasToolbar/CanvasToolbar";
import { useGame } from "../../../context/GameContext";
import socket from "../../../socket";

interface GuesserInterfaceProps {
  wordToDraw: string[];
  drawingData: string;
}

const GuesserInterface: FC<GuesserInterfaceProps> = ({
  wordToDraw,
  drawingData,
}) => {
  const { currentPlayer } = useGame();
  const [guess, setGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const handleGuessSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const guessObj = {
      nickname: currentPlayer?.nickname,
      text: guess.toLowerCase().trim(),
    };
    if (guessObj.text === wordToDraw.join("").toLowerCase()) {
      setIsCorrect(true);
    }
    socket.emit("guess", guessObj);
    setGuess("");
  };

  return (
    <div
      className={styles.guesserInterfaceContainer}
      data-testid="ArtistInterface"
    >
      <Letters
        wordToDraw={wordToDraw}
        hidden={!isCorrect}
        bounceAnimation={isCorrect}
      />
      <ReceivingCanvas drawingData={drawingData} />
      <CanvasToolbar
        brushRadius={9}
        setBrushRadius={() => {}}
        brushColor={"black"}
        setBrushColor={() => {}}
        clearCanvas={() => {}}
        undo={() => {}}
        isArtist={false}
        guess={guess}
        setGuess={setGuess}
        handleGuessSubmit={handleGuessSubmit}
      />
    </div>
  );
};

export default GuesserInterface;
