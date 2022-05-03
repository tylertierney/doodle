import { createContext, useContext, useState, useEffect } from "react";
import { CharacterObj } from "../components/CharacterSelect/characters";
import socket from "../socket";
import { getLocalStorage } from "../utils/utils";

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
  possibleWords: string[];
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
  timer: number;
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
  timer: 90,
};

export const GameContext = createContext<GameContextType>(initial);

const GameProvider: React.FC = ({ children }) => {
  const [ipAddress, setIpAddress] = useState("");
  const [gameStage, setGameStage] = useState("initial");
  const [players, setPlayers] = useState<Player[]>([]);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<null | Player>(null);
  const [timer, setTimer] = useState(90);

  const getIpAddress = async () => {
    socket.on("ipAddress", (ipAddress) => {
      setIpAddress(ipAddress);
    });
  };

  useEffect(() => {
    getIpAddress();
  }, []);

  useEffect(() => {
    const gameFromLocal = getLocalStorage();
    if (gameFromLocal) {
      if (gameFromLocal?.currentPlayer) {
        setCurrentPlayer(gameFromLocal.currentPlayer);
        setGameStage(gameFromLocal.gameStage);
        setPlayers(gameFromLocal.players);
        setIpAddress(gameFromLocal.ipAddress);
        setTurns(gameFromLocal.turns);
      }
    }

    socket.on("setTimer", (time: number) => {
      setTimer(time);
    });
  }, []);

  useEffect(() => {
    const context = {
      players,
      ipAddress,
      gameStage,
      turns,
      currentPlayer,
    };
    localStorage.setItem("doodle-context", JSON.stringify(context));
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
    timer,
  };
  return <GameContext.Provider value={ctx}>{children}</GameContext.Provider>;
};

export default GameProvider;

export const useGame = () => useContext(GameContext);
