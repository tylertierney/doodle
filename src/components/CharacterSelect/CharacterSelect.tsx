import { Stack, Text, Title } from "@mantine/core";
import styles from "./CharacterSelect.module.css";
import { CharacterObj, characters } from "./characters";
import { useEffect, useRef, useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { Player, useGame } from "../../context/GameContext";
import { GiQueenCrown } from "react-icons/gi";
import socket from "../../socket";
import GradientBtn from "../GradientBtn/GradientBtn";
import TabsMenu from "./TabsMenu/TabsMenu";
import { renderVideo } from "../../utils/utils";

interface CharacterSelectProps {
  existingGame: boolean;
}

const CharacterSelect: React.FC<CharacterSelectProps> = ({ existingGame }) => {
  const {
    setGameStage,
    setCurrentPlayer,
    gameStage,
    peerId,
    usingVideo,
    setUsingVideo,
  } = useGame();
  const [charactersArr, setCharactersArr] =
    useState<CharacterObj[]>(characters);
  const [nickname, setNickname] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const [errorText, setErrorText] = useState("");

  const handleCharacterSelect = (name: string) => {
    setCharactersArr(
      characters.map((item: CharacterObj) => {
        item.isSelected = item.name === name ? true : false;
        return item;
      })
    );
  };

  const generateId = () => {
    return (Math.random() + 1).toString(36).substring(7);
  };

  const handleSubmit = () => {
    const playerObj: Player = {
      nickname,
      selectedCharacter,
      isVIP: existingGame ? false : true,
      id: generateId(),
      peerId,
      usingVideo,
    };
    setCurrentPlayer(playerObj);
    existingGame
      ? socket.emit("joinLobby", playerObj)
      : socket.emit("createLobby", playerObj);
    setGameStage("waitingForPlayers");
  };

  const selectedCharacter = charactersArr.filter((item: CharacterObj) => {
    return item.isSelected;
  })[0];

  const crownBadge = (
    <div className="crownBadge">
      <GiQueenCrown style={{ width: "75%", height: "75%" }} />
    </div>
  );

  const getUserMedia = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream: MediaStream) => {
        setUsingVideo(true);
        renderVideo(stream, userVideoRef);
      })
      .catch((err) => {
        setUsingVideo(false);
        if (err.name === "NotFoundError") {
          setErrorText(
            "Requested media device not found. Check your camera and microphone, or use an avatar instead."
          );
        }
      });
  };

  useEffect(() => {
    if (activeTab === 1) {
      getUserMedia();
    }
  }, [activeTab]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.menuContainer}>
        <div className={styles.wrappingContainer}>
          <Stack style={{ flexGrow: 1, width: "50%" }}>
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
            <TabsMenu
              charactersArr={charactersArr}
              handleCharacterSelect={handleCharacterSelect}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              errorText={errorText}
            />
          </Stack>
          <Stack
            align="center"
            justify="center"
            style={{
              gap: 0,
              minWidth: "300px",
              minHeight: "180px",
              width: "50%",
            }}
          >
            {activeTab === 0 ? (
              <img
                className={styles.selectedCharacterImg}
                src={selectedCharacter?.icon}
                style={{
                  backgroundColor: selectedCharacter?.color,
                  margin: 0,
                }}
              />
            ) : (
              // <video
              //   ref={userVideoRef}
              //   className={`${styles.selectedCharacterImg} ${styles.videoHTML}`}
              //   autoPlay={true}
              // >
              //   <source
              //     src="http://techslides.com/demos/samples/sample.mp4"
              //     type="video/mp4"
              //   />
              // </video>
              <video
                className={`${styles.selectedCharacterImg} ${styles.videoHTML}`}
                autoPlay={true}
                ref={userVideoRef}
              ></video>
            )}
            <Text
              weight="bold"
              align="center"
              size="lg"
              color="white"
              style={{ fontSize: "1.6rem", minHeight: "2.2rem" }}
              className={styles.selectedCharacterText}
            >
              {nickname}
            </Text>
          </Stack>
        </div>
      </div>
      <div
        className={`${styles.menuContainer} ${styles.goToLobbyMenu}`}
        style={{
          justifyContent:
            gameStage === "characterSelect_creating_game"
              ? "space-between"
              : "flex-end",
        }}
      >
        {gameStage === "characterSelect_creating_game" && (
          <>
            {crownBadge}
            <Text
              style={{
                fontSize: "1.2rem",
                flexBasis: "400px",
                marginBottom: "0.6rem",
              }}
            >
              You are the VIP, so you'll have control over the game options
            </Text>
          </>
        )}
        <GradientBtn
          fullWidth={false}
          rightIcon={<BsArrowRightCircle size="1.4rem" />}
          onClick={() => handleSubmit()}
          style={{ marginLeft: "auto" }}
        >
          Go To Lobby
        </GradientBtn>
      </div>
    </div>
  );
};

export default CharacterSelect;
