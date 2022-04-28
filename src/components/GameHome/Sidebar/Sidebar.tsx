import { Text } from "@mantine/core";
import { Player } from "../../../context/GameContext";
import { GiQueenCrown } from "react-icons/gi";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  players: Player[];
  side: "left" | "right";
}

const Sidebar: React.FC<SidebarProps> = ({ players, side }) => {
  const crownBadge = (
    <div className="crownBadgeSmall">
      <GiQueenCrown style={{ width: "75%", height: "75%" }} />
    </div>
  );

  return (
    <div
      className={`${styles.sidebarContainer} ${
        side === "left" ? styles.left : styles.right
      }`}
    >
      {players.map((player: Player, idx: number) => {
        return (
          <div
            className={styles.playerContainer}
            key={idx}
            style={{
              alignItems: idx % 2 === 0 ? "flex-start" : "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={player.selectedCharacter.icon}
                  style={{
                    borderRadius: "50%",
                    backgroundColor: player.selectedCharacter.color,
                    margin: 0,
                  }}
                  width="60px"
                  height="60px"
                />
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
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
