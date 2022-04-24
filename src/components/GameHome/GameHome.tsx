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
import GradientBtn from "../GradientBtn/GradientBtn";
import Lobby from "../Lobby/Lobby";
import { useEffect, useState } from "react";
import { Turn } from "../../context/GameContext";

interface GameHomeProps {
  drawingData: string;
  stage: "waitingForPlayers" | "playing";
}

const GameHome: React.FC<GameHomeProps> = ({ stage, drawingData }) => {
  const { players, turns, currentPlayer } = useGame();

  const half = Math.ceil(players.length / 2);
  const leftSidePlayers = players.slice(0, half);
  const rightSidePlayers = players.slice(half, players.length);

  const activeTurn = turns[turns.length - 1];
  const isArtist = currentPlayer?.id === activeTurn?.artist?.id;
  console.log(isArtist);
  console.log(activeTurn);

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
          <Lobby />
        ) : (
          <>
            {isArtist ? (
              <Canvas />
            ) : (
              <ReceivingCanvas drawingData={drawingData} />
            )}
            {/* <Canvas /> */}
          </>
        )}
        <Sidebar players={rightSidePlayers} />
      </div>
    </Stack>
  );
};

export default GameHome;
