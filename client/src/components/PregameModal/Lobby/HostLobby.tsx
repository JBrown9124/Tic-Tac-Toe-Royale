import Settings from "./Settings/Settings";
import Grid from "@mui/material/Grid";
import PlayerList from "./PlayerList";
import Button from "@mui/material/Button";
import { useState } from "react";
import playerReady from "../../../creators/APICreators/playerReady";
import joinLobby from "../../../creators/APICreators/joinLobby";
import Typography from "@mui/material/Typography";
import { Player } from "../../../Models/Player";
import { Lobby } from "../../../Models/Lobby";
import { useCookies } from "react-cookie";
import CopyLobbyId from "./CopyLobbyId";
interface PlayerListProps {
  handleLeave: () => void;
  setPiece: (piece: string) => void;
  setLobby: (lobby: Lobby) => void;
  setSize: (size: number) => void;
  size:number,
  playerPiece: string;
  players: Player[];
  hostSid: number;
  playerId: string;
}
export default function HostLobby({
  handleLeave,
  playerPiece,
  setLobby,
  setPiece,
  players,
  hostSid,
  playerId,
  setSize, size 
}: PlayerListProps) {
  const [sessionCookie, setSessionCookie] = useCookies();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleStart = () => {
    setSessionCookie("command", "start", { path: "/" });
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
    if (sessionCookie?.board?.winBy > sessionCookie?.board?.size) {
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
      player: {
        name: sessionCookie.name,
        piece: pieceValue,
        playerId: sessionCookie.playerId,
      },
      lobbyId: parseInt(sessionCookie?.lobbyId),
      hostSid: hostSid,
    };
    playerReady(reqBody);
  };
  const handleAddABot = () => {
    const botsInLobby = players.filter((player) => {
      return player?.playerId?.substring(0, 3) === "BOT";
    });

    const createBot = async () => {
      const reqBody = {
        lobbyId: sessionCookie?.lobbyId,
        playerName: "BOTPASSPASS",
      };
      const response = await joinLobby(reqBody);
      if (typeof response !== "string") {
        setLobby(response.lobby);
      }
    };
    if (botsInLobby.length < 10) {
      createBot();
    }
  };
  return (
    <>
      <Grid container direction="column" spacing={2}>
        <CopyLobbyId />
        <Grid item container sx={{ textAlign: "center" }} spacing={6}>
          <Grid item xs={12} sm={6}>
            <Settings
            size={size}
            setSize={(props)=>setSize(props)}
              playerPiece={playerPiece}
              setPiece={(props) => sendHostPiece(props)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PlayerList players={players} playerPiece={playerPiece} />
            <Button onClick={() => handleAddABot()}> Add a Bot</Button>
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
