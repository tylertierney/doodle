import { useEffect, useRef } from "react";
import styles from "../Sidebar.module.css";
import { renderVideo } from "../../../../utils/utils";
import { CharacterObj } from "../../../CharacterSelect/characters";

interface PlayerVideoProps {
  stream: MediaStream | null;
  isMuted: boolean;
  selectedCharacter: CharacterObj;
}
const PlayerVideo: React.FC<PlayerVideoProps> = ({
  stream,
  isMuted,
  selectedCharacter,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (stream !== undefined && stream !== null) {
      renderVideo(stream, videoRef);
    }
  }, [videoRef.current, stream]);

  if (!stream || stream.getVideoTracks().length < 1) {
    return (
      <img
        src={selectedCharacter.icon}
        style={{
          backgroundColor: selectedCharacter.color,
          margin: 0,
        }}
        className={styles.characterImg}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay={true}
      className={`${styles.characterImg} ${styles.videoHTML}`}
      muted={isMuted}
      playsInline
    ></video>
  );
};

export default PlayerVideo;
