import { Stack } from "@mantine/core";
import { useGame } from "../../context/GameContext";
import CharacterSelect from "../CharacterSelect/CharacterSelect";
import styles from "./Lobby.module.css";
import { Title, Text, Loader } from "@mantine/core";
import { BsArrowRightCircle } from "react-icons/bs";
import GradientBtn from "../GradientBtn/GradientBtn";
import socket from "../../socket";

const Lobby: React.FC = () => {
  const { players, setGameStage, currentPlayer } = useGame();

  const handleStart = () => {
    socket.emit("startGame");
    setGameStage("playing");
  };

  const message = currentPlayer?.isVIP
    ? "Waiting for others to join..."
    : "Waiting for host to start...";

  return (
    <div className={styles.waitingForPlayersContainer}>
      <Title order={1} style={{ margin: 0 }}>
        <span className={styles.playerCount}>{players.length}</span>
        &nbsp;player
        {players.length > 1 && <span>s</span>} in the lobby
      </Title>
      <div className={styles.waitingForPlayersMessageContainer}>
        <Text style={{ fontSize: "1.4rem" }}>{message}</Text>
        <Loader size="xl" color="orange" variant="dots" />
      </div>
      {currentPlayer?.isVIP && (
        <GradientBtn
          fullWidth={true}
          rightIcon={<BsArrowRightCircle size="1.4rem" />}
          onClick={() => handleStart()}
        >
          Everyone in? Start Game!
        </GradientBtn>
      )}
    </div>
  );
};

export default Lobby;
