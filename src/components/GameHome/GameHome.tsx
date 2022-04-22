import { Button, Stack, Text, Title } from "@mantine/core";
import { useGame, Player } from "../../context/GameContext";
import PaperSVG from "../PaperSVG/PaperSVG";
import styles from "./GameHome.module.css";
import Canvas from "../Canvas/Canvas";
import ReceivingCanvas from "../ReceivingCanvas/ReceivingCanvas";
import Sidebar from "./Sidebar/Sidebar";
import { BsArrowRightCircle } from "react-icons/bs";
import socket from "../../socket";
import { Loader } from "@mantine/core";

interface GameHomeProps {
  drawingData: string;
  stage: "waitingForPlayers" | "playing";
}

const GameHome: React.FC<GameHomeProps> = ({ stage, drawingData }) => {
  const { players, setGameStage } = useGame();

  const half = Math.ceil(players.length / 2);
  const leftSidePlayers = players.slice(0, half);
  const rightSidePlayers = players.slice(half, players.length);

  const handleStart = () => {
    socket.emit("startGame");
    setGameStage("playing");
  };

  return (
    <Stack
      align="center"
      justify="center"
      className={styles.gameHomeBackground}
    >
      <PaperSVG />
      <div className={styles.gameHomeContainer}>
        <Sidebar players={leftSidePlayers} />
        {stage === "waitingForPlayers" ? (
          <div
            style={{
              minWidth: "400px",
              minHeight: "400px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Title order={2}>
              <span
                style={{
                  color: "orange",
                  textDecoration: "underline",
                  fontSize: "1.9rem",
                }}
              >
                {players.length}
              </span>
              &nbsp;player
              {players.length > 1 && <span>s</span>} in the lobby
            </Title>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: "1.4rem" }}>
                Waiting for others to join...
              </Text>
              <Loader size="xl" color="orange" variant="dots" />
            </div>
            <Button
              variant="gradient"
              gradient={{ from: "orange", to: "yellow" }}
              size="lg"
              radius="md"
              fullWidth={true}
              rightIcon={<BsArrowRightCircle size="1.4rem" />}
              // onClick={() => setGameStage("playing")}
              onClick={() => handleStart()}
            >
              Start Game!
            </Button>
          </div>
        ) : (
          <>
            <Canvas />
            <ReceivingCanvas drawingData={drawingData} />
          </>
        )}
        <Sidebar players={rightSidePlayers} />
      </div>
    </Stack>
  );
};

export default GameHome;
