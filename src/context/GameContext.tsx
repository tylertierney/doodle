import { createContext, useContext, useState, useEffect } from "react";
import { CharacterObj } from "../components/CharacterSelect/characters";
import socket from "../socket";

export interface Player {
  nickname: string;
  selectedCharacter: CharacterObj;
  isVIP: boolean;
}

export interface Turn {
  word: string;
  drawing: string;
  player: Player;
  guesses: string[];
  active: boolean;
}

export interface GameContextType {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  ipAddress: string;
  gameStage: string;
  setGameStage: (gameStage: string) => void;
  turns: Turn[];
  setTurns: (turns: Turn[]) => void;
}

const initial: GameContextType = {
  players: [],
  setPlayers: () => [],
  ipAddress: "",
  gameStage: "initial",
  setGameStage: () => "initial",
  turns: [],
  setTurns: () => [],
};

export const GameContext = createContext<GameContextType>(initial);

const GameProvider: React.FC = ({ children }) => {
  const [ipAddress, setIpAddress] = useState("");
  const [gameStage, setGameStage] = useState("initial");
  const [players, setPlayers] = useState<Player[]>([]);
  const [turns, setTurns] = useState<Turn[]>([]);

  const getIpAddress = async () => {
    socket.on("ipAddress", (ipAddress) => {
      setIpAddress(ipAddress);
    });
  };

  useEffect(() => {
    getIpAddress();
  }, []);

  const ctx: GameContextType = {
    players,
    setPlayers,
    ipAddress,
    gameStage,
    setGameStage,
    turns,
    setTurns,
  };
  return <GameContext.Provider value={ctx}>{children}</GameContext.Provider>;
};

export default GameProvider;

export const useGame = () => useContext(GameContext);
