import { useGame } from "../../context/GameContext";
import styles from "./GameHome.module.css";
import Sidebar from "./Sidebar/Sidebar";
import Lobby from "../Lobby/Lobby";
import ArtistInterface from "./ArtistInterface/ArtistInterface";
import GuesserInterface from "./GuesserInterface/GuesserInterface";
import WordSelection from "./WordSelection/WordSelection";
import { usePeer } from "../../context/PeerContext";
import Scorecard from "./Scorecard/Scorecard";

interface GameHomeProps {
  drawingData: string;
  stage: "waitingForPlayers" | "wordSelection" | "playing" | "roundOver";
}

const GameHome: React.FC<GameHomeProps> = ({ stage, drawingData }) => {
  const { players, turns, currentPlayer } = useGame();
  const { streams } = usePeer();

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
      case "roundOver":
        return <Scorecard turn={turns[turns.length - 1]} />;
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
