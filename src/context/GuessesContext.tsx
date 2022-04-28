import { useContext } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FC } from "react";
import { createContext } from "react";
import Guesses from "../components/GameHome/Guesses/Guesses";
import socket from "../socket";

export interface GuessType {
  nickname: string;
  text: string;
  id: number;
}

interface GuessContextType {
  addGuess: (guess: GuessType) => void;
  removeGuess: (id: number) => void;
}

const GuessesContext = createContext<GuessContextType>({
  addGuess: () => {},
  removeGuess: () => {},
});

let id = 1;

const GuessesProvider: React.FC = ({ children }) => {
  const [guesses, setGuesses] = useState<GuessType[]>([]);

  const addGuess = useCallback(
    (guess: GuessType) => {
      setGuesses((guesses) => [
        ...guesses,
        { id: id++, nickname: guess.nickname, text: guess.text },
      ]);
    },
    [setGuesses]
  );

  const removeGuess = useCallback(
    (id: number) => {
      setGuesses((guesses) => guesses.filter((t) => t.id !== id));
    },
    [setGuesses]
  );

  useEffect(() => {
    socket.on("guess", (guess) => {
      addGuess(guess);
    });
  }, [socket]);

  return (
    <GuessesContext.Provider value={{ addGuess, removeGuess }}>
      {children}
      <Guesses guesses={guesses} setGuesses={setGuesses} />
    </GuessesContext.Provider>
  );
};

export default GuessesProvider;

export const useGuesses = () => useContext(GuessesContext);
