import styles from "./Welcome.module.css";
import PaperSVG from "../PaperSVG/PaperSVG";
import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { BiPlusCircle } from "react-icons/bi";
import { BsArrowRightCircle } from "react-icons/bs";
import { useGame } from "../../context/GameContext";
import GradientBtn from "../GradientBtn/GradientBtn";
import KadoodleTextSVG from "../KadoodleTextSVG/KadoodleTextSVG";

const Welcome: React.FC = () => {
  const { setGameStage } = useGame();

  return (
    <Stack align="center" justify="center" className={styles.welcomeBackground}>
      <PaperSVG />
      <Stack
        align="center"
        justify="center"
        className={styles.welcomeContainer}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            width: "100%",
            padding: "0.6rem 0",
            margin: "0.6rem 0",
          }}
        >
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
          Kadoodle is a multiplayer guessing game like Pictionary or Drawful.
          Friends who are connected to your WiFi network can join your lobby and
          play.
        </Text>
        <Group position="center">
          <Button
            variant="outline"
            color="orange"
            radius="md"
            size="lg"
            rightIcon={<BsArrowRightCircle size="1.4rem" />}
            onClick={() => setGameStage("characterSelect_joining_game")}
          >
            Join Game
          </Button>
          <GradientBtn
            fullWidth={false}
            rightIcon={<BiPlusCircle size="1.7rem" />}
            onClick={() => setGameStage("characterSelect_creating_game")}
          >
            Create New Game
          </GradientBtn>
        </Group>
      </Stack>
    </Stack>
  );
};

export default Welcome;
