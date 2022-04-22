import { Text } from "@mantine/core";
import { Player } from "../../../context/GameContext";
import { GiQueenCrown } from "react-icons/gi";

interface SidebarProps {
  players: Player[];
}

const Sidebar: React.FC<SidebarProps> = ({ players }) => {
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1.2rem",
                }}
              >
                {player.isVIP && <GiQueenCrown color="gold" />}
                <Text weight="bold" key={idx} style={{ fontSize: "1.1rem" }}>
                  {player.nickname}&nbsp;
                </Text>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
