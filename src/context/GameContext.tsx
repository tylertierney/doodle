import { createContext, useContext, useState, useEffect } from "react";
import { CharacterObj } from "../components/CharacterSelect/characters";
import socket from "../socket";

export interface Player {
  nickname: string;
  selectedCharacter: CharacterObj;
  isVIP: boolean;
  id: string;
}

export interface Turn {
  word: string;
  drawing: string;
  artist: Player;
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
  currentPlayer: null | Player;
  setCurrentPlayer: (currentPlayer: Player | null) => void;
}

const initial: GameContextType = {
  players: [],
  setPlayers: () => [],
  ipAddress: "",
  gameStage: "initial",
  setGameStage: () => "initial",
  turns: [],
  setTurns: () => [],
  currentPlayer: null,
  setCurrentPlayer: () => {},
};

export const GameContext = createContext<GameContextType>(initial);

const GameProvider: React.FC = ({ children }) => {
  const [ipAddress, setIpAddress] = useState("");
  const [gameStage, setGameStage] = useState("initial");
  const [players, setPlayers] = useState<Player[]>([]);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<null | Player>(null);

  const getIpAddress = async () => {
    socket.on("ipAddress", (ipAddress) => {
      setIpAddress(ipAddress);
    });
  };

  useEffect(() => {
    getIpAddress();
  }, []);

  useEffect(() => {
    let existingGame: GameContextType | null = null;
    const gameFromLocal: string | null = localStorage.getItem("doodle-context");
    if (gameFromLocal) {
      existingGame = JSON.parse(gameFromLocal);
      if (existingGame?.currentPlayer) {
        setCurrentPlayer(existingGame.currentPlayer);
        setGameStage(existingGame.gameStage);
        setPlayers(existingGame.players);
        setIpAddress(existingGame.ipAddress);
        setTurns(existingGame.turns);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("doodle-context", JSON.stringify(ctx));
  }, [
    players.length,
    ipAddress,
    gameStage,
    turns.length,
    currentPlayer,
    turns[turns.length - 1]?.drawing,
  ]);

  const ctx: GameContextType = {
    players,
    setPlayers,
    ipAddress,
    gameStage,
    setGameStage,
    turns,
    setTurns,
    currentPlayer,
    setCurrentPlayer,
  };
  return <GameContext.Provider value={ctx}>{children}</GameContext.Provider>;
};

export default GameProvider;

export const useGame = () => useContext(GameContext);
