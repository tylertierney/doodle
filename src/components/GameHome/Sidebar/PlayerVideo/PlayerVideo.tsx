import { useEffect, useRef } from "react";
import { usePeer } from "../../../../context/PeerContext";
import styles from "../Sidebar.module.css";
import { renderVideo } from "../../../../utils/utils";

interface PlayerVideoProps {
  stream: MediaStream | null;
}
const PlayerVideo: React.FC<PlayerVideoProps> = ({ stream }) => {
  // return null;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // console.log(stream);
    if (stream != undefined) {
      renderVideo(stream, videoRef);
    }
  }, [videoRef.current]);

  return (
    <video
      ref={videoRef}
      autoPlay={true}
      className={`${styles.characterImg}`}
    ></video>
  );
};

export default PlayerVideo;
