import Grid from "@mui/material/Grid";
import ColorSelector from "./ColorSelector";
import SizeSlider from "./SizeSlider";
import BotOptions from "./BotOptions";
import PieceSelector from "./PieceSelector/PieceSelector";
import { RgbaColor } from "react-colorful";
import WinBy from "./WinBy";
import { Player } from "../../../../Models/Player";
import { Lobby } from "../../../../Models/Lobby";
import { primaryFontColor } from "../../../../themes/theme1";

interface SettingsProps {
  setPiece: (piece: string) => void;
  playerPiece: string;
  setSize: (size: number) => void;
  size: number;
  setColor: (color: RgbaColor) => void;
  color: RgbaColor;
  winBy: number;
  setWinBy: (value: number) => void;
  players: Player[];
  lobbyId: number;
  setLobby: (lobby: Lobby) => void;
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
  players,
  lobbyId,
  setLobby,
}: SettingsProps) {
  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      sx={{
        p: 2,
        background: "#519657",
        borderRadius: "15px",
        boxShadow: 20,
        border:"1px solid #ec407a",
      }}
      justifyContent="center"
    >
      <Grid item  xs={12} sm={12} md={6} lg={6}>
        <ColorSelector setColor={(props) => setColor(props)} color={color} />
      </Grid>
      <Grid item container direction="column" xs={12} md={6} sm={12} lg={6} spacing={2} sx={{p:2}}>
        <Grid item>
          <SizeSlider size={size} setSize={(props) => setSize(props)} />
        </Grid>
        <Grid container item direction="row" justifyContent="center" spacing={2}>
          <Grid item md={6} sm={6} lg={6} xs={6}>
            <WinBy
              winBy={winBy}
              setWinBy={(props) => setWinBy(props)}
              size={size}
            />
          </Grid>
          <Grid item md={6}  xs={6}>
            <BotOptions
              lobbyId={lobbyId}
              setLobby={(props) => setLobby(props)}
              players={players}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
