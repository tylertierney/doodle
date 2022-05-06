import { useEffect, useRef } from "react";
import { usePeer } from "../../../../context/PeerContext";
import styles from "../Sidebar.module.css";
import { renderVideo } from "../../../../utils/utils";

interface PlayerVideoProps {
  stream: MediaStream;
}
const PlayerVideo: React.FC<PlayerVideoProps> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (stream != undefined) {
      renderVideo(stream, videoRef);
    }
  }, [videoRef.current]);

  console.log(stream);

  return (
    <video
      ref={videoRef}
      autoPlay={true}
      className={`${styles.characterImg}`}
    ></video>
  );
};

export default PlayerVideo;
