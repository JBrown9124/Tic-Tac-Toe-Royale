import PlayerList from "./PlayerList";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Player} from '../../../Models/Player'
interface GuestLobbyProps{
  players:Player[]
}
export default function GuestLobby({players}:GuestLobbyProps) {
  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <Typography>Wait for host to start game...</Typography>
        </Grid>
        <Grid item>
          <PlayerList players={players} />
        </Grid>
      </Grid>
    </>
  );
}
