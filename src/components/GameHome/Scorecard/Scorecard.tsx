import { Title } from "@mantine/core";
import { BsArrowRightCircle } from "react-icons/bs";
import { Player, Turn, useGame } from "../../../context/GameContext";
import { getNumberSuffix } from "../../../utils/utils";
import GradientBtn from "../../GradientBtn/GradientBtn";
import Letters from "../Letters/Letters";
import styles from "./Scorecard.module.css";

interface ScorecardProps {
  turn: Turn;
}

const Scorecard: React.FC<ScorecardProps> = ({ turn }) => {
  const { currentPlayer } = useGame();
  let scoresArr: any = [];

  if (turn.pointsThisTurn) {
    scoresArr = Object.entries(turn.pointsThisTurn)
      .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
      .map((scoreItem: [string, number], idx: number) => {
        return (
          <li className={`${styles.scoreLI} ${styles.liAnimation}`} key={idx}>
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
    <div className={styles.scorecardBackground}>
      <div className={styles.scorecardContainer}>
        <Title style={{ color: "var(--lightorange)" }} align="center">
          time's up! the word was...
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
        {currentPlayer?.isVIP && (
          <div className={styles.btnContainer}>
            <GradientBtn
              fullWidth={false}
              onClick={() => {}}
              disabled={false}
              rightIcon={<BsArrowRightCircle size="1.4rem" />}
            >
              Next Round
            </GradientBtn>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scorecard;
