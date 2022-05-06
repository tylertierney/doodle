import { useEffect, useRef } from "react";
import styles from "../Sidebar.module.css";
import { renderVideo } from "../../../../utils/utils";

interface PlayerVideoProps {
  stream: MediaStream | null;
  isMuted: boolean;
}
const PlayerVideo: React.FC<PlayerVideoProps> = ({ stream, isMuted }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (stream != undefined) {
      renderVideo(stream, videoRef);
    }
  }, [videoRef.current, stream]);

  return (
    <video
      ref={videoRef}
      autoPlay={true}
      className={`${styles.characterImg}`}
      muted={isMuted}
    ></video>
  );
};

export default PlayerVideo;
