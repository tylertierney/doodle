import styles from "./Welcome.module.css";
import PaperSVG from "../PaperSVG/PaperSVG";
import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { BiPlusCircle } from "react-icons/bi";
import { BsArrowRightCircle } from "react-icons/bs";
import { useGame } from "../../context/GameContext";

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
        <Title align="center" style={{ fontSize: "2.1rem" }} order={1}>
          Welcome to&nbsp;
          <span style={{ color: "orange" }}>Doodle!</span>
        </Title>
        <Text
          size="lg"
          align="center"
          style={{ maxWidth: "500px", padding: "0 0.5rem" }}
          component="p"
        >
          Doodle is a multiplayer guessing game like Pictionary or Drawful.
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
          <Button
            variant="gradient"
            gradient={{ from: "orange", to: "yellow" }}
            size="lg"
            radius="md"
            rightIcon={<BiPlusCircle size="1.7rem" />}
            onClick={() => setGameStage("characterSelect_creating_game")}
          >
            Create New Game
          </Button>
        </Group>
      </Stack>
    </Stack>
  );
};

export default Welcome;
