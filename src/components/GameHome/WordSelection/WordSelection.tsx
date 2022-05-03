import { Title } from "@mantine/core";
import { FC } from "react";
import { useGame } from "../../../context/GameContext";
import socket from "../../../socket";
import styles from "./WordSelection.module.css";

interface WordSelectionProps {
  isArtist: boolean;
}

const WordSelection: FC<WordSelectionProps> = ({ isArtist }) => {
  const { turns } = useGame();

  const possibleWords = turns[turns.length - 1]?.possibleWords;

  const handleSelectWord = (word: string) => {
    socket.emit("selectWord", word);
  };

  return (
    <div className={styles.wordSelectionBackground} data-testid="WordSelection">
      {isArtist ? (
        <div
          className={styles.menuWrapper}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Title>Choose a word to draw</Title>
          <div className={styles.wordsContainer}>
            {possibleWords.map((word: string, idx: number) => {
              return (
                <button
                  key={idx}
                  className={styles.wordBtn}
                  onClick={() => handleSelectWord(word)}
                >
                  {word}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <Title style={{ width: "400px", maxWidth: "90%", textAlign: "center" }}>
          Waiting on someone to choose a word
        </Title>
      )}
    </div>
  );
};

export default WordSelection;
