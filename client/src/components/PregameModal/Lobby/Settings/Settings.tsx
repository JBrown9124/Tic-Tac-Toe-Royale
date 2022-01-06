import Grid from "@mui/material/Grid";
import ColorSelector from "./ColorSelector";
import SizeSlider from "./SizeSlider";
import PieceSelector from "./PieceSelector";
import WinBy from "./WinBy";
interface SettingsProps {
  setPiece: (piece: string) => void;
  playerPiece: string;
}
export default function Settings({ setPiece, playerPiece }: SettingsProps) {
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <SizeSlider />
      </Grid>
      <Grid item>
        <WinBy />
      </Grid>
      <Grid item>
        <ColorSelector />
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
