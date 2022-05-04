import { RefObject, useEffect, useRef } from "react";
import { useState } from "react";
import "./App.css";
import CharacterSelect from "./components/CharacterSelect/CharacterSelect";
import GameHome from "./components/GameHome/GameHome";
import Welcome from "./components/Welcome/Welcome";
import { Player, Turn, useGame } from "./context/GameContext";
import socket from "./socket";
import Peer from "peerjs";
import { renderVideo } from "./utils/utils";

function App() {
  const {
    gameStage,
    setGameStage,
    setPlayers,
    setTurns,
    currentPlayer,
    setCurrentPlayer,
    setPeerId,
    players,
  } = useGame();
  const [drawingData, setDrawingData] = useState("");
  const currentUserVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

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

  const [peer, setPeer] = useState<Peer | null>(null);

  useEffect(() => {
    const peerInstance = new Peer();
    peerInstance.on("open", (id: string) => {
      setPeerId(id);
    });

    peerInstance.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((mediaStream: MediaStream) => {
          call.answer(mediaStream);
          renderVideo(mediaStream, currentUserVideoRef);
          call.on("stream", (remoteStream: MediaStream) => {
            renderVideo(remoteStream, remoteVideoRef);
          });
        })
        .catch((err) => {
          call.answer();
          call.on("stream", (remoteStream: MediaStream) => {
            renderVideo(remoteStream, remoteVideoRef);
          });
          console.log(err);
        });
    });

    setPeer(peerInstance);
  }, []);

  const call = () => {
    if (peer) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream: MediaStream) => {
          renderVideo(stream, currentUserVideoRef);
          const call = peer.call(players[0].peerId, stream);
          call.on("stream", (remoteStream: MediaStream) => {
            renderVideo(remoteStream, remoteVideoRef);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div
      style={{
        width: "100%",
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
      <button onClick={() => call()}>call</button>
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
