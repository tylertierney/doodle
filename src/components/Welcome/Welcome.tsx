import styles from "./Welcome.module.css";
import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { BiPlusCircle, BiLoaderAlt } from "react-icons/bi";
import { BsArrowRightCircle } from "react-icons/bs";
import { useGame } from "../../context/GameContext";
import GradientBtn from "../GradientBtn/GradientBtn";
import KadoodleTextSVG from "../KadoodleTextSVG/KadoodleTextSVG";
import { useEffect, useRef, useState } from "react";
import socket from "../../socket";
import BackButton from "../BackButton/BackButton";

interface WelcomeProps {
  enteringRoomCode: boolean;
}

const Welcome: React.FC<WelcomeProps> = ({ enteringRoomCode }) => {
  const { gameStage, setGameStage, roomCodeInput, setRoomCodeInput } =
    useGame();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const callback = (roomExists: boolean) => {
      setIsLoading(false);
      if (roomExists) {
        setError("");
        setGameStage("characterSelect_joining_game");
        return;
      }
      setError("That game doesn't exist, try a different code.");
    };

    socket.on("checkIfRoomExists", callback);

    return () => {
      socket.off("checkIfRoomExists", callback);
    };
  }, []);
  let submitBtnDisabled = true;

  if (roomCodeInput.length === 4 && !isLoading) {
    submitBtnDisabled = false;
  }

  const handleSubmit = () => {
    if (submitBtnDisabled) {
      return;
    }
    setIsLoading(true);
    socket.emit("checkIfRoomExists", roomCodeInput);
  };

  const roomCodeInputRef = useRef<HTMLInputElement>(null);
  const roomCodeSubmitBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleEnterKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (roomCodeSubmitBtnRef.current) {
          roomCodeSubmitBtnRef.current.click();
        }
      }
    };

    window.addEventListener("keydown", handleEnterKey);

    return () => window.removeEventListener("keydown", handleEnterKey);
  }, []);

  useEffect(() => {
    if (enteringRoomCode) {
      if (roomCodeInputRef.current) {
        roomCodeInputRef.current.focus();
      }
    }
  }, [enteringRoomCode]);

  return (
    <Stack align="center" justify="center" className={styles.welcomeBackground}>
      <div className={styles.backBtnContainer}>
        {gameStage !== "initial" && (
          <BackButton onClick={() => setGameStage("initial")} />
        )}
      </div>
      <Stack
        align="center"
        justify="center"
        className={styles.welcomeContainer}
        style={{ height: "100%", flexGrow: 1 }}
      >
        {enteringRoomCode ? (
          <>
            <div className={styles.roomCodeContainer}>
              <Title align="center" style={{ fontSize: "2.1rem", margin: 0 }}>
                Enter a room code
              </Title>
              <input
                className={styles.roomCodeInput}
                type="text"
                value={roomCodeInput}
                onChange={(e) => setRoomCodeInput(e.target.value.toUpperCase())}
                maxLength={4}
                ref={roomCodeInputRef}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="characters"
              />
            </div>
            {error && (
              <Text align="center" className={styles.errorText}>
                {error}
              </Text>
            )}
            <GradientBtn
              fullWidth={true}
              rightIcon={
                isLoading ? null : <BsArrowRightCircle size="1.4rem" />
              }
              onClick={() => handleSubmit()}
              disabled={submitBtnDisabled}
              style={{ color: "white" }}
              ref={roomCodeSubmitBtnRef}
            >
              {isLoading ? (
                <BiLoaderAlt
                  style={{
                    color: "white",
                    fontSize: "2rem",
                    strokeWidth: "3px",
                  }}
                  className="loader"
                />
              ) : (
                "Join Game"
              )}
            </GradientBtn>
          </>
        ) : (
          <>
            <div className={styles.headerContainer}>
              <Title
                align="center"
                style={{ fontSize: "2.1rem", margin: 0 }}
                order={1}
              >
                Welcome to&nbsp;
              </Title>
              <div style={{ display: "flex", alignItems: "center" }}>
                <KadoodleTextSVG />
                <Title
                  align="center"
                  style={{
                    fontSize: "3.6rem",
                    margin: 0,
                    transform: "translate(-6px, -3px)",
                    color: "var(--lightorange)",
                  }}
                  order={1}
                >
                  !
                </Title>
              </div>
            </div>
            <Text
              size="lg"
              align="center"
              style={{ maxWidth: "500px", padding: "0 0.5rem" }}
              component="p"
            >
              Kadoodle is a multiplayer drawing + guessing game. Create a lobby
              and invite friends to your game, or join an existing one.
            </Text>
            <Group position="center">
              <Button
                variant="outline"
                color="orange"
                radius="md"
                size="lg"
                rightIcon={<BsArrowRightCircle size="1.4rem" />}
                onClick={() => setGameStage("entering_roomCode")}
              >
                Join Game
              </Button>
              <GradientBtn
                fullWidth={false}
                rightIcon={<BiPlusCircle size="1.7rem" />}
                disabled={false}
                onClick={() => setGameStage("characterSelect_creating_game")}
              >
                Create New Game
              </GradientBtn>
            </Group>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default Welcome;
