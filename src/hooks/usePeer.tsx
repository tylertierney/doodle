// import { RefObject, useState, useEffect } from "react";
// import Peer from "peerjs";
// import { useGame } from "../context/GameContext";
// import { renderVideo } from "../utils/utils";

const usePeer = () =>
  // currentUserVideoRef: RefObject<HTMLVideoElement>,
  // remoteVideoRef: RefObject<HTMLVideoElement>
  {
    // const [peer, setPeer] = useState<Peer | null>(null);
    // useEffect(() => {
    //   const peerInstance = new Peer();
    //   peerInstance.on("open", (id: string) => {
    //     setPeerId(id);
    //   });
    //   peerInstance.on("call", (call) => {
    //     navigator.mediaDevices
    //       .getUserMedia({ video: true, audio: true })
    //       .then((mediaStream: MediaStream) => {
    //         call.answer(mediaStream);
    //         renderVideo(mediaStream, currentUserVideoRef);
    //         call.on("stream", (remoteStream: MediaStream) => {
    //           renderVideo(remoteStream, remoteVideoRef);
    //         });
    //       })
    //       .catch((err) => {
    //         call.answer();
    //         call.on("stream", (remoteStream: MediaStream) => {
    //           renderVideo(remoteStream, remoteVideoRef);
    //         });
    //         console.log(err);
    //       });
    //   });
    //   setPeer(peerInstance);
    // }, []);
    // const call = (remotePeerId: string) => {
    //   if (!remotePeerId) return null;
    //   if (peer) {
    //     navigator.mediaDevices
    //       .getUserMedia({ video: true, audio: true })
    //       .then((stream: MediaStream) => {
    //         renderVideo(stream, currentUserVideoRef);
    //         const call = peer.call(remotePeerId, stream);
    //         call.on("stream", (remoteStream: MediaStream) => {
    //           renderVideo(remoteStream, remoteVideoRef);
    //         });
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   }
    // };
    // return call;
  };

export default usePeer;
