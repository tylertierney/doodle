import { Text } from "@mantine/core";
import { Player, useGame } from "../../../../context/GameContext";
import styles from "../Sidebar.module.css";
import { GiQueenCrown } from "react-icons/gi";
import PlayerVideo from "../PlayerVideo/PlayerVideo";
import { StreamsIdentifier, usePeer } from "../../../../context/PeerContext";
import { useEffect, useRef, useState } from "react";

interface PlayerAvatarProps {
  player: Player;
  idx: number;
  streams: StreamsIdentifier;
}

const PlayerAvatar: React.FC<PlayerAvatarProps> = ({
  player,
  idx,
  streams,
}) => {
  const { userStream } = usePeer();
  const { currentPlayer } = useGame();
  const [initialScore, setInitialScore] = useState(player.points);
  const notInitialRender = useRef(false);
  const [pointDiff, setPointDiff] = useState(0);

  const crownBadge = (
    <div className="crownBadgeSmall">
      <GiQueenCrown style={{ width: "75%", height: "75%" }} />
    </div>
  );

  useEffect(() => {
    if (notInitialRender.current === true) {
      setPointDiff(player.points - initialScore);
      setInitialScore(player.points);
      const timer = setTimeout(() => {
        setPointDiff(0);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      notInitialRender.current = true;
    }
  }, [player.points]);

  if (!currentPlayer) return null;

  return (
    <div
      className={styles.playerContainer}
      key={idx}
      style={{
        alignItems: idx % 2 === 0 ? "flex-start" : "flex-end",
      }}
    >
      <div className={styles.playerAvatarAndName}>
        <div
          className={styles.playerAvatarAndBadges}
          style={{ lineHeight: "1" }}
        >
          {player.usingMedia ? (
            <PlayerVideo
              stream={
                player.id === currentPlayer.id
                  ? userStream
                  : streams[player.peerId]
              }
              isMuted={player.id === currentPlayer.id ? true : false}
              selectedCharacter={player.selectedCharacter}
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
          <div className={styles.playerScoreBadge}>{player.points}</div>
          {pointDiff > 0 && (
            <div className={styles.scoreAnimation}>{`+${pointDiff}`}</div>
          )}
        </div>

        <Text
          weight="bold"
          key={idx}
          style={{
            fontSize: "1.1rem",
            backgroundColor: "white",
            padding: "0 0.3rem",
            borderRadius: "6px",
            maxWidth: "120px",
            overflow: "hidden",
            overflowWrap: "break-word",
            textAlign: "center",
            lineHeight: 1,
          }}
        >
          {player.nickname}
        </Text>
      </div>
    </div>
  );
};

export default PlayerAvatar;
