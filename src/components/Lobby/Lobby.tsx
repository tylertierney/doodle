import { useGame } from "../../context/GameContext";
import styles from "./Lobby.module.css";
import { Title, Text, Loader } from "@mantine/core";
import { BsArrowRightCircle } from "react-icons/bs";
import GradientBtn from "../GradientBtn/GradientBtn";
import socket from "../../socket";

const Lobby: React.FC = () => {
  const { players, setGameStage, currentPlayer, roomCode } = useGame();

  const handleStart = () => {
    socket.emit("startGame", roomCode);
    setGameStage("wordSelection");
  };

  const message = currentPlayer?.isVIP
    ? "Waiting for others to join..."
    : "Waiting for host to start...";

  return (
    <div className={styles.waitingForPlayersBackground}>
      <div className={styles.roomCodeContainer}>
        <span className={styles.roomCodeText}>Room Code</span>
        <span className={styles.roomCode}>{roomCode}</span>
      </div>
      <div
        className={styles.waitingForPlayersContainer}
        style={{ width: "86%", height: "86%" }}
      >
        <Title order={1} style={{ margin: 0 }} align="center">
          <span className={styles.playerCount}>{players.length}</span>
          &nbsp;player
          {players.length > 1 && <span>s</span>} in the lobby
        </Title>
        <div className={styles.waitingForPlayersMessageContainer}>
          <Text style={{ fontSize: "1.4rem" }} align="center">
            {message}
          </Text>
          <Loader size="xl" color="orange" variant="dots" />
        </div>
        {currentPlayer?.isVIP && (
          <div style={{ width: "90%" }}>
            <GradientBtn
              fullWidth={true}
              rightIcon={<BsArrowRightCircle size="1.4rem" />}
              onClick={() => handleStart()}
            >
              Everyone in? Start Game!
            </GradientBtn>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lobby;
