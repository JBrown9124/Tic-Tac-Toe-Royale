import Settings from "./Settings/Settings";
import Grid from "@mui/material/Grid";
import PlayerList from "./PlayerList";
import Button from "@mui/material/Button";
import { useState } from "react";
import { RgbaColorPicker, RgbaColor } from "react-colorful";
import ClearIcon from "@mui/icons-material/Clear";
import playerReady from "../../../creators/playerReady";
import Typography from "@mui/material/Typography";
import { Player } from "../../../Models/Player";
import { useCookies } from "react-cookie";
import { useSound } from "use-sound";
interface PlayerListProps {
  handleLeave: () => void;
  setPiece: (piece: string) => void;
  playerPiece: string;
  players: Player[];
  hostSid:number,
}
export default function HostLobby({
  handleLeave,
  playerPiece,
  setPiece,
  players,
  hostSid
}: PlayerListProps) {
  const [sessionCookies, setSessionCookies] = useCookies();
  const [startMusic] = useSound(
    process.env.PUBLIC_URL + "/assets/sounds/bugablue-656.mp3"
  );
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleStart = () => {
    setSessionCookies("command", "start", { path: "/" });
    startMusic();
  };
  const allPlayersReady = () => {
    const playersNotReady = players.filter((player) => {
      return !player.isReady && !player.isHost;
    });
    if (playersNotReady.length > 0) {
      setErrorMessage("Players not ready.");
      setIsError(true);
      return false;
    }
    if (players.length <= 1) {
      setErrorMessage("Need at least 2 players.");
      setIsError(true);
      return false;
    }
    if (!playerPiece) {
      setErrorMessage("Select a piece.");
      setIsError(true);
      return false;
    }
    if (sessionCookies?.board?.winBy > sessionCookies?.board?.size) {
      setErrorMessage("Win By must be less than or equal to board size.");
      setIsError(true);
      return false;
    }
    setIsError(false);
    return true;
  };
  const sendHostPiece = (pieceValue: string) => {
    setPiece(pieceValue);
    const reqBody = {
      player: { name: sessionCookies.name, piece: pieceValue },
      lobbyId: parseInt(sessionCookies?.lobbyId),
      hostSid: hostSid,
    };
    playerReady(reqBody);
  };
  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item textAlign="right">
          <Typography>Lobby ID: {sessionCookies?.lobbyId}</Typography>
        </Grid>
        <Grid item container sx={{ textAlign: "center" }} spacing={6}>
          <Grid item xs={12} sm={6}>
            <Settings
              playerPiece={playerPiece}
              setPiece={(props) => sendHostPiece(props)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PlayerList players={players} playerPiece={playerPiece} />
          </Grid>
        </Grid>
        {isError && (
          <Grid container direction="column" textAlign="center">
            <Grid item>
              <Typography sx={{ color: "red" }}> {errorMessage}</Typography>
            </Grid>
          </Grid>
        )}
        <Grid item container justifyContent="center" spacing={2}>
          <Grid item>
            <Button onClick={handleLeave}>Leave</Button>
          </Grid>

          <Grid item>
            <Button
              onClick={() =>
                allPlayersReady() ? handleStart() : setIsError(true)
              }
            >
              Start
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
