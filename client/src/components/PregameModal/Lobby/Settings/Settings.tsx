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
    <Grid container spacing={2} direction="column" sx={{borderRadius:"100px", p:0}}>
      <Grid item>
      <ColorSelector setColor={(props) => setColor(props)} color={color} />
       
      </Grid>
      <Grid item container direction="row">
        <Grid item xs={12} md={6}>
          <WinBy
            winBy={winBy}
            setWinBy={(props) => setWinBy(props)}
            size={size}
          />
        </Grid>
        <Grid item  xs={12} md={6}>
        <SizeSlider size={size} setSize={(props) => setSize(props)} />
        </Grid>
      </Grid>
    </Grid>
  );
}
