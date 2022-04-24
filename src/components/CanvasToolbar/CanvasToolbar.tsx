import styles from "./CanvasToolbar.module.css";

interface CanvasToolbarProps {
  brushRadius: number;
  setBrushRadius: () => void;
  brushColor: string;
  setBrushColor: () => void;
}

const CanvasToolbar: React.FC<CanvasToolbarProps> = ({
  brushRadius,
  setBrushRadius,
  brushColor,
  setBrushColor,
}) => {
  return <div className={styles.toolbarContainer}></div>;
};

export default CanvasToolbar;
