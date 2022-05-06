import { useGame } from "../../context/GameContext";
import styles from "./GameHome.module.css";
import Sidebar from "./Sidebar/Sidebar";
import Lobby from "../Lobby/Lobby";
import ArtistInterface from "./ArtistInterface/ArtistInterface";
import GuesserInterface from "./GuesserInterface/GuesserInterface";
import WordSelection from "./WordSelection/WordSelection";
import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { usePeer } from "../../context/PeerContext";

interface GameHomeProps {
  drawingData: string;
  stage: "waitingForPlayers" | "wordSelection" | "playing";
}

export interface StreamsIdentifier {
  [key: string]: MediaStream;
}

const GameHome: React.FC<GameHomeProps> = ({ stage, drawingData }) => {
  const [streams, setStreams] = useState<StreamsIdentifier>({});
  const { players, turns, currentPlayer } = useGame();
  const { peer } = usePeer();

  // useEffect(() => {
  //   const peerInstance = new Peer();
  //   peerInstance.on("open", (id: string) => {
  //     setPeerId(id);
  //   });
  //   peerInstance.on("call", (call) => {
  //     navigator.mediaDevices
  //       .getUserMedia({ video: true, audio: false })
  //       .then((mediaStream: MediaStream) => {
  //         call.answer();
  //         if (currentUserVideoRef.current) {
  //           currentUserVideoRef.current.srcObject = mediaStream;
  //         }
  //         call.on("stream", (remoteStream: MediaStream)=>{
  //           streams[]
  //         })
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   });
  //   setPeer(peerInstance);
  // }, []);
  useEffect(() => {
    if (!currentPlayer) return;
    if (players.length > 0 && peer) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream: MediaStream) => {
          const targetPlayerPeerId = players[players.length - 1].peerId;
          setStreams((streams) => {
            let streamObj = { ...streams };
            streamObj[currentPlayer.peerId] = stream;
            return streamObj;
          });
          const call = peer.call(targetPlayerPeerId, stream);
          call.on("stream", (remoteStream: MediaStream) => {
            setStreams((streams) => {
              let streamObj = { ...streams };
              streamObj[targetPlayerPeerId] = remoteStream;
              return streamObj;
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [players.length]);

  const half = Math.ceil(players.length / 2);
  const leftSidePlayers = players.slice(0, half);
  const rightSidePlayers = players.slice(half, players.length);

  const activeTurn = turns[turns.length - 1];
  const isArtist = currentPlayer?.id === activeTurn?.artist?.id;

  const wordToDraw: string[] = turns[turns.length - 1]?.word.split("");

  const getGameScreen = (stage: string, isArtist: boolean) => {
    switch (stage) {
      case "waitingForPlayers":
        return <Lobby />;
      case "wordSelection":
        return <WordSelection isArtist={isArtist} />;
      case "playing":
        return (
          <div
            style={{ position: "relative", flexGrow: 1 }}
            className={styles.interfaceContainer}
          >
            {isArtist ? (
              <ArtistInterface wordToDraw={wordToDraw} />
            ) : (
              <GuesserInterface
                drawingData={drawingData}
                wordToDraw={wordToDraw}
              />
            )}
          </div>
        );
    }
  };

  return (
    <div className={styles.gameHomeContainer}>
      <Sidebar
        playersOnThisSide={leftSidePlayers}
        side="left"
        streams={streams}
      />
      {getGameScreen(stage, isArtist)}
      <Sidebar
        playersOnThisSide={rightSidePlayers}
        side="right"
        streams={streams}
      />
    </div>
  );
};

export default GameHome;
