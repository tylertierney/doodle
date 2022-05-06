import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Peer from "peerjs";

interface PeerContextType {
  peer: any;
  setPeer: Dispatch<SetStateAction<any>>;
  peerId: string;
  setPeerId: Dispatch<SetStateAction<string>>;
  userStream: MediaStream;
  setUserStream: Dispatch<SetStateAction<MediaStream>>;
}

const initial: PeerContextType = {
  peer: null,
  setPeer: () => {},
  peerId: "",
  setPeerId: () => {},
  userStream: {} as MediaStream,
  setUserStream: () => {},
};

export const PeerContext = createContext<PeerContextType>(initial);

const PeerProvider: React.FC = ({ children }) => {
  const [peer, setPeer] = useState<Peer>();
  const [peerId, setPeerId] = useState<string>("");
  const [userStream, setUserStream] = useState({} as MediaStream);

  useEffect(() => {
    const peerInstance = new Peer();
    peerInstance.on("open", (id: string) => {
      setPeerId(id);
    });
    setPeer(peerInstance);
  }, []);

  const ctx: PeerContextType = {
    peer,
    setPeer,
    peerId,
    setPeerId,
    userStream,
    setUserStream,
  };

  return <PeerContext.Provider value={ctx}>{children}</PeerContext.Provider>;
};

export default PeerProvider;

export const usePeer = () => useContext(PeerContext);
