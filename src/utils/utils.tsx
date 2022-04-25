export const getLocalStorage = (
  key?: "currentPlayer" | "gameStage" | "ipAddress" | "players" | "turns"
) => {
  let existingGame = null;
  const gameFromLocal = localStorage.getItem("doodle-context");
  //   console.log(gameFromLocal);
  if (!gameFromLocal) return;

  existingGame = JSON.parse(gameFromLocal);

  if (key) {
    return existingGame[key];
  }
  console.log(existingGame);
  return existingGame;
};
