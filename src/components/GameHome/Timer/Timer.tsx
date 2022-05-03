import { useRef } from "react";
import { useGame } from "../../../context/GameContext";
import styles from "./Timer.module.css";

const Timer: React.FC = () => {
  const { timer } = useGame();
  const timerRef = useRef<HTMLSpanElement>(null);

  return (
    <span ref={timerRef} className={styles.timer}>
      {timer}
    </span>
  );
};

export default Timer;
