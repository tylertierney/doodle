import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { BsCameraVideoFill, BsCameraVideoOffFill } from "react-icons/bs";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { usePeer } from "../../context/PeerContext";
import styles from "./Navbar.module.css";
import { useState } from "react";
import { useGame } from "../../context/GameContext";
import NavMenu from "../NavMenu/NavMenu";
import BackButton from "../BackButton/BackButton";

const Navbar: React.FC = () => {
  const { micMuted, setMicMuted, videoMuted, setVideoMuted } = usePeer();
  const { usingMedia, gameStage, setGameStage } = useGame();

  const [menuOpen, setMenuOpen] = useState(false);

  const backBtnStyles = { color: "white", backgroundColor: "var(--orangered)" };

  const getBackButton = (gameStage: string) => {
    if (gameStage === "characterSelect_joining_game") {
      return (
        <BackButton
          onClick={() => setGameStage("entering_roomCode")}
          style={backBtnStyles}
        />
      );
    }
    if (gameStage === "characterSelect_creating_game") {
      return (
        <BackButton
          onClick={() => setGameStage("initial")}
          style={backBtnStyles}
        />
      );
    }
  };

  return (
    <div className={styles.navContainer}>
      <div className={styles.backBtnContainer}>{getBackButton(gameStage)}</div>
      <div className={styles.controlsContainer}>
        {usingMedia && (
          <>
            <button
              className={`${styles.micBtn} ${
                videoMuted ? styles.disabled : styles.enabled
              }`}
              onClick={() => setVideoMuted(!videoMuted)}
            >
              {videoMuted ? (
                <BsCameraVideoOffFill style={{ height: "40px" }} />
              ) : (
                <BsCameraVideoFill />
              )}
            </button>
            <button
              className={`${styles.micBtn} ${
                micMuted ? styles.disabled : styles.enabled
              }`}
              onClick={() => setMicMuted(!micMuted)}
            >
              {micMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </button>
          </>
        )}
        <button
          className={`${styles.micBtn} ${styles.enabled}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <IoMdClose style={{ height: "40px" }} />
          ) : (
            <IoMdMenu style={{ height: "40px" }} />
          )}
        </button>
      </div>
      <NavMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </div>
  );
};

export default Navbar;
