import Grid from "@mui/material/Grid";
import ColorSelector from "./ColorSelector";
import SizeSlider from "./SizeSlider";
import PieceSelector from "./PieceSelector";
import WinBy from "./WinBy";
interface SettingsProps {
  setPiece: (piece: string) => void;
  setSize:(size:number)=>void;
  size:number,
  playerPiece: string;
}
export default function Settings({ setPiece, playerPiece, setSize, size }: SettingsProps) {
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <SizeSlider
        size={size}
        setSize={(props)=>setSize(props)}
        />
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
