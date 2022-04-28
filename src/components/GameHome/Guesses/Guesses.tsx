import React, { Dispatch } from "react";
import { useEffect } from "react";
import { FC } from "react";
import { GuessType, useGuesses } from "../../../context/GuessesContext";
import styles from "./Guesses.module.css";

interface GuessesProps {
  guesses: GuessType[];
  setGuesses: Dispatch<React.SetStateAction<GuessType[]>>;
}

const Guesses: FC<GuessesProps> = ({ guesses, setGuesses }) => {
  return (
    <div className={styles.guessContainer} data-testid="Guesses">
      {guesses.map((guess: GuessType, idx: number) => {
        return (
          <Guess
            key={idx}
            id={guess.id}
            nickname={guess.nickname}
            text={guess.text}
            setGuesses={setGuesses}
          />
        );
      })}
    </div>
  );
};

export default Guesses;

interface GuessProps {
  id: number;
  nickname: string;
  text: string;
  setGuesses: Dispatch<React.SetStateAction<GuessType[]>>;
}
const Guess: FC<GuessProps> = ({ id, nickname, text, setGuesses }) => {
  const { removeGuess } = useGuesses();

  useEffect(() => {
    const timer = setTimeout(() => {
      setGuesses((guesses) => guesses.filter((t) => t.id !== id));
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [id, removeGuess]);
  return <span>{text}</span>;
};
