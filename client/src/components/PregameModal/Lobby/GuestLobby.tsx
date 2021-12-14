import PlayerList from "./PlayerList";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Player } from "../../../Models/Player";
import Button from "@mui/material/Button";
import PieceSelector from "./Settings/PieceSelector";
import { useCookies } from "react-cookie";
import playerReady from "../../../creators/playerReady";
import {Lobby} from "../../../Models/Lobby"

interface GuestLobbyProps {
  setPiece:(piece:string)=> void;
  playerPiece:string;
  handleLeave: () => void;
  lobby: Lobby
}
export default function GuestLobby({ handleLeave, playerPiece, setPiece, lobby }: GuestLobbyProps) {
  const [sessionCookies, setSessionCookies] = useCookies();
  const handleReady = async () => {
    const reqBody = {
      player: { name: sessionCookies?.name, piece: playerPiece },
      lobbyId: lobby?.lobbyId,
    };
    playerReady(reqBody);
  };
  return (
    <>
      <Grid container direction="column" justifyContent="center">
        <Grid item>
          <Typography>Wait for host to start game...</Typography>
        </Grid>
        <Grid item>
          <PlayerList players={lobby?.players} />
        </Grid>
        <Grid item>
          <PieceSelector playerPiece={playerPiece} setPiece={(props)=>setPiece(props)}/>
        </Grid>
        <Grid item>
          {" "}
          <Button onClick={() => handleReady()}>Ready</Button>
        </Grid>
        <Grid item textAlign="center">
          <Button onClick={() => handleLeave()}>Leave</Button>
        </Grid>
      </Grid>
    </>
  );
}
