import { useEffect, useRef } from "react";
import { useState } from "react";
import "./App.css";
import CharacterSelect from "./components/CharacterSelect/CharacterSelect";
import GameHome from "./components/GameHome/GameHome";
import Welcome from "./components/Welcome/Welcome";
import { Turn, useGame } from "./context/GameContext";
import { usePeer } from "./context/PeerContext";
import socket from "./socket";
// import usePeer from "./hooks/usePeer";

function App() {
  const {
    gameStage,
    setGameStage,
    setPlayers,
    setTurns,
    currentPlayer,
    setCurrentPlayer,
    players,
  } = useGame();
  const [drawingData, setDrawingData] = useState("");
  const currentUserVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const { userStream } = usePeer();

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
      if (currentPlayer) setGameStage("wordSelection");
      setTurns(turns);
    });
    socket.on("selectWord", (turns: Turn[]) => {
      setTurns(turns);
      setGameStage("playing");
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
      case "wordSelection":
        return <GameHome stage="wordSelection" drawingData={drawingData} />;
      case "playing":
        return <GameHome stage="playing" drawingData={drawingData} />;
      default:
        return <Welcome />;
    }
  };

  return (
    <div className="appContainer">
      {getGameSection(gameStage)}
      {currentPlayer?.isVIP && (
        <button onClick={() => socket.emit("endGame")}>end game</button>
      )}
      {/* <button onClick={() => call(players[0].peerId)}>call</button> */}
      <button onClick={() => console.log(userStream)}>userStream</button>
      <div style={{ border: "2px solid red" }}>
        Current User<video autoPlay={true} ref={currentUserVideoRef}></video>
      </div>
      <div style={{ border: "2px solid green" }}>
        Remote User<video autoPlay={true} ref={remoteVideoRef}></video>
      </div>
    </div>
  );
}

export default App;
