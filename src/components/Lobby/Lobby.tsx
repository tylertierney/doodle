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

  const hostName = players.filter((player) => player.isVIP)[0]?.nickname;

  const message = currentPlayer?.isVIP
    ? "Waiting for others to join..."
    : `Waiting for ${hostName || "host"} to start the game...`;

  return (
    <div className={styles.waitingForPlayersBackground}>
      <div className={styles.waitingForPlayersContainer}>
        <div className={styles.roomCodeRow}>
          <div className={styles.roomCodeContainer}>
            <span className={styles.roomCodeText}>Room Code</span>
            <span className={styles.roomCode}>{roomCode}</span>
          </div>
        </div>
        <div
          className={styles.mainContent}
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
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  marginBottom: "4px",
                  opacity: 0.6,
                }}
              >
                Everyone in?
              </div>
              <GradientBtn
                fullWidth={true}
                rightIcon={<BsArrowRightCircle size="1.4rem" />}
                onClick={() => handleStart()}
                disabled={false}
              >
                Start Game!
              </GradientBtn>
            </div>
          )}
        </div>
        <div className={styles.spacer}></div>
      </div>
    </div>
  );
};

export default Lobby;
