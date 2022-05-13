import { Title } from "@mantine/core";
import { Player, Turn } from "../../../context/GameContext";
import { getNumberSuffix } from "../../../utils/utils";
import Letters from "../Letters/Letters";
import styles from "./Scorecard.module.css";

interface ScorecardProps {
  turn: Turn;
}

const Scorecard: React.FC<ScorecardProps> = ({ turn }) => {
  let scoresArr: any = [];

  if (turn.pointsThisTurn) {
    scoresArr = Object.entries(turn.pointsThisTurn)
      .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
      .map((scoreItem: [string, number], idx: number) => {
        return (
          <li className={styles.scoreLI} key={idx}>
            <span className={styles.place}>
              {idx + 1 + getNumberSuffix(idx + 1)}
            </span>
            <span className={styles.nickname}>{scoreItem[0]}</span>
            <span className={styles.pointDiff}>{`+${scoreItem[1]}`}</span>
          </li>
        );
      });
  }

  return (
    <div className={styles.scorecardContainer}>
      <Title style={{ color: "var(--lightorange)" }}>
        time's up! the word was
      </Title>
      <Letters
        bounceAnimation={true}
        hidden={false}
        wordToDraw={turn.word.split("")}
        showTimer={false}
      />
      <ul className={styles.scorecardUL} style={{ paddingLeft: 0 }}>
        {scoresArr}
      </ul>
    </div>
  );
};

export default Scorecard;
