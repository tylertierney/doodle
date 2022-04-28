import { FC } from "react";
import styles from "./Letters.module.css";

interface LettersProps {
  wordToDraw: string[];
  hidden: boolean;
}

const Letters: FC<LettersProps> = ({ wordToDraw, hidden }) => {
  if (!wordToDraw) return null;

  return (
    <div className={styles.wordToDrawContainer}>
      {wordToDraw.map((letter: string, idx: number) => {
        return (
          <div key={idx} className={styles.letter}>
            {hidden ? "" : letter}
          </div>
        );
      })}
    </div>
  );
};

export default Letters;
