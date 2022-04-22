import { Title } from "@mantine/core";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas/Canvas";
import CharacterSelect from "./components/CharacterSelect/CharacterSelect";
import GameHome from "./components/GameHome/GameHome";
import Lobby from "./components/Lobby/Lobby";
import ReceivingCanvas from "./components/ReceivingCanvas/ReceivingCanvas";
import Welcome from "./components/Welcome/Welcome";
import { Player, Turn, useGame } from "./context/GameContext";
import socket from "./socket";

function App() {
  const { gameStage, setPlayers, setTurns } = useGame();
  const [drawingData, setDrawingData] = useState("");

  useEffect(() => {
    socket.on("draw", (drawingData: string) => {
      setDrawingData(drawingData);
    });

    socket.on("createLobby", (players: any) => {
      setPlayers(players);
    });
    socket.on("joinLobby", (players: any) => {
      setPlayers(players);
    });
    socket.on("startGame", (turns: Turn[]) => {
      setTurns(turns);
    });
  }, []);

  switch (gameStage) {
    case "initial":
      return <Welcome />;
    case "characterSelect_creating_game":
      return <CharacterSelect existingGame={false} />;
    case "characterSelect_joining_game":
      return <CharacterSelect existingGame={true} />;
    case "lobby":
      return <Lobby />;
    case "waitingForPlayers":
      return <GameHome stage="waitingForPlayers" drawingData={drawingData} />;
    case "playing":
      return <GameHome stage="playing" drawingData={drawingData} />;
    default:
      return <Welcome />;
  }
}

export default App;
