import Settings from "./Settings/Settings";
import Grid from "@mui/material/Grid";
import PlayerList from "./PlayerList";
import Button from "@mui/material/Button";
import { useState } from "react";
import playerReady from "../../../creators/APICreators/playerReady";
import leaveLobby from "../../../creators/APICreators/leaveLobby";
import joinLobby from "../../../creators/APICreators/joinLobby";
import CustomButton from "../../CustomButton";
import Typography from "@mui/material/Typography";
import { Player } from "../../../Models/Player";
import { Lobby } from "../../../Models/Lobby";
import { RgbaColor } from "react-colorful";
import { useCookies } from "react-cookie";
import CopyLobbyId from "./CopyLobbyId";
import useSound from "use-sound";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import Zoom from "@mui/material/Zoom";
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
  lobbyId,
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
      return handleError("Players not ready.");
    }
    if (players.length <= 1) {
      return handleError("Need at least 2 players.");
    }
    if (!playerPiece) {
      return handleError("Select a piece.");
    }
    if (winBy > size) {
      return handleError("Win By must be less than or equal to board size.");
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
        sessionId: null,
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
  const handleRemoveBot = () => {
    const botsInLobby = players.filter((player) => {
      return player?.playerId?.substring(0, 3) === "BOT";
    });
    const lastBotMade = botsInLobby[botsInLobby.length - 1];
    leaveLobby({ player: lastBotMade, hostSid: hostSid, lobbyId: lobbyId });
  };
  return (
    <>
      <Grid container direction="column" spacing={2} >
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
            <Grid container item justifyContent="center" alignItems="center">
              <Grid item sx={{ p: 1 }}>
                <Tooltip
                  placement="right"
                  TransitionComponent={Zoom}
                  title={
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontFamily: "Bungee Hairline, cursive !important",
                        fontWeight: "800 !important",
                      }}
                    >
                      Add up to 10 bots!
                    </Typography>
                  }
                >
                  <div>
                    <CustomButton
                      onClick={() => handleAddABot()}
                      message={"+"}
                      sx={{ fontSize: "2rem", borderRadius: "100px" }}
                      icon={
                        <img
                          style={{ width: "40px", height: "40px" }}
                          src={
                            "https://cdn1.iconfinder.com/data/icons/robots-avatars-set/354/Robot_bot___robot_robo_bot_artificial_intelligence-512.png"
                          }
                          alt={"bot"}
                        />
                      }
                    />
                  </div>
                </Tooltip>
              </Grid>

              {/* <Grid item>
            <Button onClick={() => handleRemoveBot()}> Remove Bot</Button>
          </Grid> */}
            </Grid>
            <PlayerList
              playerId={playerId}
              playerName={playerName}
              players={players}
              playerPiece={playerPiece}
            />
          </Grid>
        </Grid>
        {isError && (
          <Grid container direction="column"  justifyContent="center" textAlign="center">
            <Grid item>
              <Typography sx={{ color: "red" ,
                        fontFamily: "Bungee Hairline, cursive",
                        fontWeight: "800 ", }}> {errorMessage}</Typography>
            </Grid>
          </Grid>
        )}

        <Grid item container justifyContent="center" textAlign="center" spacing={4} >
          <Grid item>
            <CustomButton onClick={handleLeave} message={"leave"} />
          </Grid>

          <Grid item>
            <CustomButton
              onClick={() =>
                allPlayersReady() ? handleStart() : setIsError(true)
              }
              message={"start"}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
