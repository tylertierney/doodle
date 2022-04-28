import React, { Dispatch } from "react";
import { useEffect } from "react";
import { FC } from "react";
import { useGame } from "../../../context/GameContext";
import { GuessType, useGuesses } from "../../../context/GuessesContext";
import { getLetterValue } from "../../../utils/utils";
import styles from "./Guesses.module.css";

interface GuessesProps {
  guesses: GuessType[];
  setGuesses: Dispatch<React.SetStateAction<GuessType[]>>;
}

const Guesses: FC<GuessesProps> = ({ guesses, setGuesses }) => {
  return (
    <div className={styles.guessContainer} data-testid="Guesses">
      {guesses.map((guess: GuessType, idx: number) => {
        return <Guess key={idx} guess={guess} setGuesses={setGuesses} />;
      })}
    </div>
  );
};

export default Guesses;

interface GuessProps {
  guess: GuessType;
  setGuesses: Dispatch<React.SetStateAction<GuessType[]>>;
}
const Guess: FC<GuessProps> = ({ guess, setGuesses }) => {
  const { removeGuess } = useGuesses();
  const { turns } = useGame();

  const wordToGuess = turns[turns.length - 1].word;

  useEffect(() => {
    const timer = setTimeout(() => {
      setGuesses((guesses) => guesses.filter((t) => t.id !== guess.id));
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [guess.id, removeGuess]);

  const lettersArr = guess.text.split("").map((letter: string, idx: number) => {
    const color = getLetterValue(letter, wordToGuess, idx);
    return (
      <span key={idx} style={{ color }}>
        {letter}
      </span>
    );
  });

  const isCorrect = wordToGuess.toLowerCase() === guess.text.toLowerCase();

  return (
    <div
      className={styles.guess}
      style={{ color: isCorrect ? "green" : "inherit" }}
    >
      {isCorrect ? <span>I got it!</span> : <span>{lettersArr}</span>}
      <span>-</span>
      <span style={{ fontWeight: "bold" }}>{guess.nickname}</span>
    </div>
  );
};
