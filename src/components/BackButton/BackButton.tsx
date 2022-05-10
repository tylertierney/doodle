import { MouseEventHandler } from "react";
import { IoIosArrowBack } from "react-icons/io";
import styles from "./BackButton.module.css";
import CSS from "csstype";

interface BackButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  style?: CSS.Properties;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, style }) => {
  return (
    <button className={styles.backBtn} onClick={onClick} style={style}>
      <IoIosArrowBack />
      Back
    </button>
  );
};

export default BackButton;
