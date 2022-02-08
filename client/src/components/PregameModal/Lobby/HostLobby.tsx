import Settings from "./Settings/Settings";
import Grid from "@mui/material/Grid";
import PlayerList from "./PlayerList";
import { useState } from "react";
import arePlayersReady from "../../../creators/HostLobbyCreators/arePlayersReady";
import handleAddBot from "../../../creators/HostLobbyCreators/handleAddBot";
import sendHostPiece from "../../../creators/HostLobbyCreators/sendHostPiece";
import CustomButton from "../../CustomButton";
import Typography from "@mui/material/Typography";
import { Player } from "../../../Models/Player";
import { Lobby } from "../../../Models/Lobby";
import { RgbaColor } from "react-colorful";
import CopyLobbyId from "./CopyLobbyId";
import useSound from "use-sound";
import Tooltip from "@mui/material/Tooltip";
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
              setPiece={(props) =>
                sendHostPiece(
                  setPiece,
                  props,
                  playerName,
                  playerId,
                  lobbyId,
                  hostSid
                )
              }
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
                      onClick={() =>
                        handleAddBot(
                          players,
                          lobbyId,
                          setLobby,
                          playAddBotSound
                        )
                      }
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
          <Grid
            container
            direction="column"
            justifyContent="center"
            textAlign="center"
          >
            <Grid item>
              <Typography
                sx={{
                  color: "red",
                  fontFamily: "Bungee Hairline, cursive",
                  fontWeight: "800 ",
                }}
              >
                {" "}
                {errorMessage}
              </Typography>
            </Grid>
          </Grid>
        )}

        <Grid
          item
          container
          justifyContent="center"
          textAlign="center"
          spacing={4}
        >
          <Grid item>
            <CustomButton onClick={handleLeave} message={"leave"} />
          </Grid>

          <Grid item>
            <CustomButton
              onClick={() =>
                arePlayersReady(
                  setErrorMessage,
                  setIsError,
                  players,
                  playerPiece,
                  winBy,
                  size
                )
                  ? handleStart()
                  : setIsError(true)
              }
              message={"start"}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
