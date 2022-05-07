import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { BsCameraVideoFill, BsCameraVideoOffFill } from "react-icons/bs";
import { usePeer } from "../../context/PeerContext";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  const { micMuted, setMicMuted, videoMuted, setVideoMuted } = usePeer();

  return (
    <div className={styles.navContainer}>
      <div className={styles.controlsContainer}>
        <button
          className={styles.micBtn}
          onClick={() => setVideoMuted(!videoMuted)}
        >
          {videoMuted ? (
            <BsCameraVideoOffFill style={{ height: "40px" }} />
          ) : (
            <BsCameraVideoFill />
          )}
        </button>
        <button
          className={styles.micBtn}
          onClick={() => setMicMuted(!micMuted)}
        >
          {micMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
