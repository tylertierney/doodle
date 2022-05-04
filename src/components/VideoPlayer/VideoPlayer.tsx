import { useRef } from "react";

interface VideoPlayerProps {
  type: "current" | "remote";
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ type }) => {
  const videoRef = useRef(null);
  return (
    <>
      <button>call</button>
      <video autoPlay={true} ref={videoRef}></video>
    </>
  );
};

export default VideoPlayer;
