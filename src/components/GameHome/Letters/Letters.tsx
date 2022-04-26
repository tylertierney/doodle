import { FC } from "react";
import styles from "./Letters.module.css";

interface LettersProps {
  wordToDraw: string[];
}

const Letters: FC<LettersProps> = ({ wordToDraw }) => {
  return (
    <>
      {wordToDraw.map((letter: string, idx: number) => {
        return (
          <span key={idx} className={styles.letter}>
            {letter}
          </span>
        );
      })}
    </>
  );
};

export default Letters;
