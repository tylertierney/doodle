import { Dispatch, SetStateAction } from "react";
import { useGame } from "../../context/GameContext";
import styles from "./NavMenu.module.css";
import socket from "../../socket";

interface NavMenuProps {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const NavMenu: React.FC<NavMenuProps> = ({ menuOpen, setMenuOpen }) => {
  const { roomCode } = useGame();

  const handleEndGame = () => {
    socket.emit("endGame", roomCode);
    setMenuOpen(false);
  };

  return (
    <>
      <div
        className={`${styles.menuContainer} ${
          menuOpen ? styles.open : styles.closed
        }`}
      >
        <div className={styles.menuListContainer}>
          <button onClick={() => handleEndGame()} className={styles.endGameBtn}>
            End Game
          </button>
        </div>
      </div>
      <div
        onClick={() => setMenuOpen(!menuOpen)}
        className={`${styles.overlay} ${
          menuOpen ? styles.overlayOpen : styles.overlayClosed
        }`}
      ></div>
    </>
  );
};

export default NavMenu;
