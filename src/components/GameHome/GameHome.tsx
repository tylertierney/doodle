import { useGame } from "../../context/GameContext";
import styles from "./GameHome.module.css";
import Sidebar from "./Sidebar/Sidebar";
import Lobby from "../Lobby/Lobby";
import ArtistInterface from "./ArtistInterface/ArtistInterface";
import GuesserInterface from "./GuesserInterface/GuesserInterface";

interface GameHomeProps {
  drawingData: string;
  stage: "waitingForPlayers" | "playing";
}

const GameHome: React.FC<GameHomeProps> = ({ stage, drawingData }) => {
  const { players, turns, currentPlayer } = useGame();

  const half = Math.ceil(players.length / 2);
  const leftSidePlayers = players.slice(0, half);
  const rightSidePlayers = players.slice(half, players.length);

  const activeTurn = turns[turns.length - 1];
  const isArtist = currentPlayer?.id === activeTurn?.artist?.id;

  const wordToDraw: string[] = turns[turns.length - 1]?.word.split("");

  return (
    <div className={styles.gameHomeContainer}>
      <Sidebar players={leftSidePlayers} side="left" />
      {stage === "waitingForPlayers" ? (
        <Lobby />
      ) : (
        <>
          {isArtist ? (
            <div
              style={{ position: "relative", flexGrow: 1 }}
              className={styles.artistInterfaceContainer}
            >
              <ArtistInterface wordToDraw={wordToDraw} />
            </div>
          ) : (
            <div
              style={{ position: "relative", flexGrow: 1 }}
              className={styles.artistInterfaceContainer}
            >
              <GuesserInterface
                drawingData={drawingData}
                wordToDraw={wordToDraw}
              />
            </div>
          )}
        </>
      )}
      <Sidebar players={rightSidePlayers} side="right" />
    </div>
  );
};

export default GameHome;
