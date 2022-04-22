import { Button, Group, Stack, Text, Title } from "@mantine/core";
import styles from "./CharacterSelect.module.css";
import { CharacterObj, characters } from "./characters";
import { useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { Player, useGame } from "../../context/GameContext";
import { GiQueenCrown } from "react-icons/gi";
import socket from "../../socket";

interface CharacterSelectProps {
  existingGame: boolean;
}

const CharacterSelect: React.FC<CharacterSelectProps> = ({ existingGame }) => {
  const { setGameStage } = useGame();
  const [charactersArr, setCharactersArr] =
    useState<CharacterObj[]>(characters);
  const [nickname, setNickname] = useState("");

  const handleCharacterSelect = (name: string) => {
    setCharactersArr(
      characters.map((item: CharacterObj) => {
        item.isSelected = item.name === name ? true : false;
        return item;
      })
    );
  };

  const handleSubmit = () => {
    const playerObj: Player = {
      nickname,
      selectedCharacter,
      isVIP: existingGame ? false : true,
    };
    existingGame
      ? socket.emit("joinLobby", playerObj)
      : socket.emit("createLobby", playerObj);
    setGameStage("waitingForPlayers");
  };

  const selectedCharacter = charactersArr.filter((item: CharacterObj) => {
    return item.isSelected;
  })[0];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "100vw",
        height: "100%",
        maxWidth: "1000px",
        gap: "1rem",
      }}
    >
      <div className={styles.container}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap-reverse",
          }}
        >
          <Stack style={{ flexGrow: 1 }}>
            <Stack spacing="xs" style={{ marginBottom: "1rem" }}>
              <Title order={2} style={{ margin: 0, color: "white" }}>
                Choose a nickname
              </Title>
              <input
                type="text"
                placeholder="CoolPerson123"
                className={styles.nicknameInput}
                maxLength={16}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </Stack>
            <Stack spacing="xs">
              <Title order={2} style={{ margin: 0, color: "white" }}>
                Choose a character
              </Title>
              <Group style={{ maxWidth: "480px" }}>
                {charactersArr.map((item: CharacterObj, idx: number) => {
                  return (
                    <img
                      onClick={() => handleCharacterSelect(item.name)}
                      key={idx}
                      src={item.icon}
                      width="70px"
                      height="70px"
                      style={{
                        backgroundColor: item.color,
                        borderRadius: "50%",
                        padding: "0.3rem",
                        cursor: "pointer",
                        border: item.isSelected ? "4px solid white" : "none",
                        boxShadow: item.isSelected
                          ? "2px 2px 14px 1px rgba(0, 0, 0, 0.3)"
                          : "none",
                      }}
                    />
                  );
                })}
              </Group>
            </Stack>
          </Stack>
          <Stack
            align="center"
            justify="center"
            style={{
              flexGrow: 1,
              gap: 0,
              minWidth: "300px",
              minHeight: "180px",
            }}
          >
            <img
              src={selectedCharacter?.icon}
              style={{
                backgroundColor: selectedCharacter?.color,
                borderRadius: "100%",
                border: "solid white 3px",
                margin: 0,
              }}
              width="140px"
              height="140px"
            />
            <Text
              weight="bold"
              align="center"
              size="lg"
              color="white"
              style={{ fontSize: "1.6rem", minHeight: "2.2rem" }}
            >
              {nickname}
            </Text>
          </Stack>
        </div>
      </div>
      <div
        className={styles.container}
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <GiQueenCrown fontSize="2rem" />
          <Text style={{ lineHeight: "1rem" }}>
            You are the VIP, so you'll have control over the game options
          </Text>
        </div>
        <Button
          variant="gradient"
          gradient={{ from: "orange", to: "yellow" }}
          size="lg"
          radius="md"
          rightIcon={<BsArrowRightCircle size="1.4rem" />}
          onClick={() => handleSubmit()}
        >
          Go To Lobby
        </Button>
      </div>
    </div>
  );
};

export default CharacterSelect;
