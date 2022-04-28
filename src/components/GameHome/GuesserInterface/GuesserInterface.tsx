import { FC } from "react";
import styles from "./GuesserInterface.module.css";
import Letters from "../Letters/Letters";
import ReceivingCanvas from "../../ReceivingCanvas/ReceivingCanvas";
import CanvasToolbar from "../CanvasToolbar/CanvasToolbar";

interface GuesserInterfaceProps {
  wordToDraw: string[];
  drawingData: string;
}

const GuesserInterface: FC<GuesserInterfaceProps> = ({
  wordToDraw,
  drawingData,
}) => {
  return (
    <div
      className={styles.guesserInterfaceContainer}
      data-testid="ArtistInterface"
    >
      <Letters wordToDraw={wordToDraw} hidden={true} />
      <ReceivingCanvas drawingData={drawingData} />
      <CanvasToolbar
        brushRadius={9}
        setBrushRadius={() => {}}
        brushColor={"black"}
        setBrushColor={() => {}}
        clearCanvas={() => {}}
        undo={() => {}}
        isArtist={false}
      />
    </div>
  );
};

export default GuesserInterface;
