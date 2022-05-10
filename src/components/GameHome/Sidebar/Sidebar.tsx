import { Player, useGame } from "../../../context/GameContext";
import styles from "./Sidebar.module.css";
import { StreamsIdentifier } from "../../../context/PeerContext";
import PlayerAvatar from "./PlayerAvatar/PlayerAvatar";

interface SidebarProps {
  playersOnThisSide: Player[];
  side: "left" | "right";
  streams: StreamsIdentifier;
}

const Sidebar: React.FC<SidebarProps> = ({
  playersOnThisSide,
  side,
  streams,
}) => {
  const { currentPlayer } = useGame();

  if (!currentPlayer) return null;

  return (
    <div
      className={`${styles.sidebarContainer} ${
        side === "left" ? styles.left : styles.right
      }`}
    >
      {playersOnThisSide.map((player: Player, idx: number) => {
        return (
          <PlayerAvatar key={idx} player={player} idx={idx} streams={streams} />
        );
      })}
    </div>
  );
};

export default Sidebar;
