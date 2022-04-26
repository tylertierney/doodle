import { Text } from "@mantine/core";
import { Player } from "../../../context/GameContext";
import { GiQueenCrown } from "react-icons/gi";

interface SidebarProps {
  players: Player[];
}

const Sidebar: React.FC<SidebarProps> = ({ players }) => {
  const crownBadge = (
    <div className="crownBadgeSmall">
      <GiQueenCrown style={{ width: "75%", height: "75%" }} />
    </div>
  );

  return (
    <div
      style={{
        minWidth: "120px",
        height: "100%",
        padding: "1rem 0.3rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {players.map((player: Player, idx: number) => {
        return (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: idx % 2 === 0 ? "flex-start" : "flex-end",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                gap: "0.3rem",
              }}
            >
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
