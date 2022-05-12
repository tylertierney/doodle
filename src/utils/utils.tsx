import { RefObject } from "react";

export const getLocalStorage = (
  key?: "currentPlayer" | "gameStage" | "ipAddress" | "players" | "turns"
) => {
  let existingGame = null;
  const gameFromLocal = localStorage.getItem("doodle-context");
  if (!gameFromLocal) return;
  existingGame = JSON.parse(gameFromLocal);
  if (key) {
    return existingGame[key];
  }
  return existingGame;
};

export const getLetterValue = (letter: string, word: string, index: number) => {
  word = word.toLowerCase();
  letter = letter.toLowerCase();
  let result = "inherit";
  if (word.includes(letter)) {
    result = "var(--lightorange)";
    if (word[index] === letter) {
      result = "green";
    }
  }
  return result;
};

export const renderVideo = (
  stream: MediaStream,
  ref: RefObject<HTMLVideoElement>
) => {
  if (ref.current) {
    ref.current.srcObject = stream;
  }
};

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const generateRoomCode = () => {
  let result = "";
  for (let i = 0; i < 4; i++) {
    result += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return result;
};

export const getNumberSuffix = (number: number) => {
  let lastNumber = String(number);
  lastNumber = lastNumber[lastNumber.length - 1];

  switch (lastNumber) {
    case "1":
      return "st";
    case "2":
      return "nd";
    case "3":
      return "rd";
    default:
      return "th";
  }
};
