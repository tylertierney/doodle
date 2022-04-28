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
  console.log(existingGame);
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
