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
import { RgbaColor } from "react-colorful";
import { useCookies } from "react-cookie";
import CopyLobbyId from "./CopyLobbyId";
import useSound from "use-sound"
interface PlayerListProps {
  handleLeave: () => void;
  setPiece: (piece: string) => void;
  setLobby: (lobby: Lobby) => void;
  setSize: (size: number) => void;
  setColor: (color: RgbaColor) => void;
  setWinBy: (value: number) => void;
  handleStart: () => void;
  winBy: number;
  color: RgbaColor;
  size: number;
  playerPiece: string;
  players: Player[];
  hostSid: number;
  playerId: string;
  playerName: string;
  lobbyId: number;
}
export default function HostLobby({
  handleLeave,
  playerPiece,
  setLobby,
  setPiece,
  handleStart,
  players,
  hostSid,
  playerId,
  setSize,
  size,
  setColor,
  color,
  winBy,
  setWinBy,
  playerName,
  lobbyId
}: PlayerListProps) {

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [playAddBotSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/addBotSound.mp3"
  );
  const handleError = (message: string) => {
    setErrorMessage(message);
    setIsError(true);
    return false;
  };
  const allPlayersReady = () => {
    const playersNotReady = players.filter((player) => {
      return !player.isReady && !player.isHost;
    });
    if (playersNotReady.length > 0) {
      handleError("Players not ready.");
    }
    if (players.length <= 1) {
      handleError("Need at least 2 players.");
    }
    if (!playerPiece) {
      handleError("Select a piece.");
    }
    if (winBy > size) {
      handleError("Win By must be less than or equal to board size.");
    }
    setIsError(false);
    return true;
  };
  const sendHostPiece = (pieceValue: string) => {
    setPiece(pieceValue);
    const reqBody = {
      player: {
        name: playerName,
        piece: pieceValue,
        playerId: playerId,
      },
      lobbyId: lobbyId,
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
        lobbyId: lobbyId,
        playerName: "BOTPASSPASS",
      };
      const response = await joinLobby(reqBody);
      if (typeof response !== "string") {
        setLobby(response.lobby);
      }
    };
    if (botsInLobby.length < 10) {
      createBot();
      playAddBotSound();
    }
  };
  return (
    <>
      <Grid container direction="column" spacing={2}>
        <CopyLobbyId lobbyId={lobbyId} />
        <Grid item container sx={{ textAlign: "center" }} spacing={6}>
          <Grid item xs={12} sm={6}>
            <Settings
              winBy={winBy}
              setWinBy={(props) => setWinBy(props)}
              color={color}
              setColor={(props) => setColor(props)}
              size={size}
              setSize={(props) => setSize(props)}
              playerPiece={playerPiece}
              setPiece={(props) => sendHostPiece(props)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PlayerList playerName={playerName} players={players} playerPiece={playerPiece} />
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
