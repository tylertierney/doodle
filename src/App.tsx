import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import CharacterSelect from "./components/CharacterSelect/CharacterSelect";
import GameHome from "./components/GameHome/GameHome";
import Welcome from "./components/Welcome/Welcome";
import { Turn, useGame } from "./context/GameContext";
import socket from "./socket";

function App() {
  const {
    gameStage,
    setGameStage,
    setPlayers,
    setTurns,
    currentPlayer,
    setCurrentPlayer,
  } = useGame();
  const [drawingData, setDrawingData] = useState("");

  const endGame = () => {
    localStorage.removeItem("doodle-context");
    setPlayers([]);
    setGameStage("initial");
    setTurns([]);
    setCurrentPlayer(null);
  };

  useEffect(() => {
    socket.on("draw", (drawingData: string, turns: Turn[]) => {
      setTurns(turns);
      setDrawingData(drawingData);
    });
    socket.on("createLobby", (players: any) => {
      setPlayers(players);
    });
    socket.on("joinLobby", (players: any) => {
      setPlayers(players);
    });
    socket.on("startGame", (turns: Turn[]) => {
      if (currentPlayer) setGameStage("playing");
      setTurns(turns);
    });
    socket.on("endGame", () => {
      endGame();
    });
  }, [currentPlayer?.id]);

  const getGameSection = (gameStage: string) => {
    switch (gameStage) {
      case "initial":
        return <Welcome />;
      case "characterSelect_creating_game":
        return <CharacterSelect existingGame={false} />;
      case "characterSelect_joining_game":
        return <CharacterSelect existingGame={true} />;
      case "waitingForPlayers":
        return <GameHome stage="waitingForPlayers" drawingData={drawingData} />;
      case "playing":
        return <GameHome stage="playing" drawingData={drawingData} />;
      default:
        return <Welcome />;
    }
  };

  return (
    <div
      style={{
        width: "100%",
        // height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {getGameSection(gameStage)}
      {currentPlayer?.isVIP && (
        <button onClick={() => socket.emit("endGame")}>end game</button>
      )}
    </div>
  );
}

export default App;
