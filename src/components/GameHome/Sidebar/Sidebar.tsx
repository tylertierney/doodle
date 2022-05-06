import { Text } from "@mantine/core";
import { Player, useGame } from "../../../context/GameContext";
import { GiQueenCrown } from "react-icons/gi";
import styles from "./Sidebar.module.css";
import { StreamsIdentifier } from "../GameHome";
import PlayerVideo from "./PlayerVideo/PlayerVideo";
import { usePeer } from "../../../context/PeerContext";

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
  const { userStream } = usePeer();
  const crownBadge = (
    <div className="crownBadgeSmall">
      <GiQueenCrown style={{ width: "75%", height: "75%" }} />
    </div>
  );

  if (!currentPlayer) return null;

  // console.log(streams);

  return (
    <div
      className={`${styles.sidebarContainer} ${
        side === "left" ? styles.left : styles.right
      }`}
    >
      {playersOnThisSide.map((player: Player, idx: number) => {
        console.log(streams[player.peerId]);
        return (
          <div
            className={styles.playerContainer}
            key={idx}
            style={{
              alignItems: idx % 2 === 0 ? "flex-start" : "flex-end",
            }}
          >
            <div className={styles.playerAvatarAndName}>
              <div className={styles.playerAvatarAndBadges}>
                {player.usingVideo && streams[player.peerId] ? (
                  // <PlayerVideo stream={userStream} />

                  <PlayerVideo
                    stream={
                      player.id === currentPlayer.id
                        ? userStream
                        : streams[player.peerId]
                    }
                  />
                ) : (
                  <img
                    src={player.selectedCharacter.icon}
                    style={{
                      backgroundColor: player.selectedCharacter.color,
                      margin: 0,
                    }}
                    className={styles.characterImg}
                  />
                )}
                {player.isVIP && crownBadge}
              </div>

              <Text
                weight="bold"
                key={idx}
                style={{
                  fontSize: "1.1rem",
                  backgroundColor: "white",
                  padding: "0 0.3rem",
                  borderRadius: "6px",
                }}
              >
                {player.nickname}
              </Text>
            </div>
            <button onClick={() => console.log(userStream)}>ref</button>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
