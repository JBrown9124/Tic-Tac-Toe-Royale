import Grid from "@mui/material/Grid";
import ColorSelector from "./ColorSelector";
import SizeSlider from "./SizeSlider";
import PieceSelector from "./PieceSelector";
import { RgbaColor } from "react-colorful";
import WinBy from "./WinBy";
interface SettingsProps {
  setPiece: (piece: string) => void;
  playerPiece: string;
  setSize: (size: number) => void;
  size: number;
  setColor: (color: RgbaColor) => void;
  color: RgbaColor;
  winBy: number;
  setWinBy: (value: number) => void;
}
export default function Settings({
  setPiece,
  playerPiece,
  setSize,
  size,
  setColor,
  color,
  winBy,
  setWinBy,
}: SettingsProps) {
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <SizeSlider size={size} setSize={(props) => setSize(props)} />
      </Grid>
      <Grid item>
        <WinBy winBy={winBy} setWinBy={(props) => setWinBy(props)} size={size} />
      </Grid>
      <Grid item>
        <ColorSelector setColor={(props) => setColor(props)} color={color} />
      </Grid>
      <Grid item>
        <PieceSelector
          playerPiece={playerPiece}
          setPiece={(props) => setPiece(props)}
        />
      </Grid>
    </Grid>
  );
}
