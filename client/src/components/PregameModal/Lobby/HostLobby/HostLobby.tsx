import Settings from "../Settings/Settings";
import Grid from "@mui/material/Grid";
import PlayerList from "../PlayerList";
import { useState } from "react";
import arePlayersReady from "../../../../creators/HostLobbyCreators/arePlayersReady";
import handleAddBot from "../../../../creators/HostLobbyCreators/handleAddBot";
import sendHostPiece from "../../../../creators/HostLobbyCreators/sendHostPiece";
import CustomButton from "../../../CustomButton";
import Typography from "@mui/material/Typography";
import { Player } from "../../../../Models/Player";
import { Lobby } from "../../../../Models/Lobby";
import { RgbaColor } from "react-colorful";
import CopyLobbyId from "../CopyLobbyId";
import PieceSelector from "../Settings/PieceSelector/PieceSelector";
import useSound from "use-sound";
import Tooltip from "@mui/material/Tooltip";
import RightTopHalfPanel from "./RightTopHalfPanel";
import BottomPanel from "./BottomPanel";
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
      <Grid
        container
        direction="column"
        justifyContent="center"
        textAlign="center"
        sx={{ p: 2, margin: "auto" }}
        spacing={0}
      >
        <CopyLobbyId lobbyId={lobbyId} />
        <Grid item container sx={{ textAlign: "center" }} spacing={2}>
          <Grid item  xs={12} md={8} sx={{}}>
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
            <Grid
              item
              container
              direction="column"
              textAlign="center"
              justifyContent="center"
              alignItems="center"
              sx={{
                width: { lg: "80%", sm: "100%" },
                margin: "auto",

                p: 2,
              }}
            >
              <PieceSelector
                playerPiece={playerPiece}
                setPiece={(props) => setPiece(props)}
              />
            </Grid>
            <Grid item sx={{p:5}}>
              <BottomPanel
                handleLeave={() => handleLeave()}
                handleStart={() => handleStart()}
                winBy={winBy}
                size={size}
                playerPiece={playerPiece}
                players={players}
                setPiece={(props) => setPiece(props)}
                isError={isError}
                errorMessage={errorMessage}
                setErrorMessage={(props) => setErrorMessage(props)}
                setIsError={(props) => setIsError(props)}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} md={3}>
            <RightTopHalfPanel
              players={players}
              lobbyId={lobbyId}
              setLobby={(props) => setLobby(props)}
              playerId={playerId}
              playerName={playerName}
              playerPiece={playerPiece}
            />
          </Grid>
        </Grid>
        {/* <Grid item>
          <BottomPanel
            handleLeave={() => handleLeave()}
            handleStart={() => handleStart()}
            winBy={winBy}
            size={size}
            playerPiece={playerPiece}
            players={players}
            setPiece={(props) => setPiece(props)}
            isError={isError}
            errorMessage={errorMessage}
            setErrorMessage={(props) => setErrorMessage(props)}
            setIsError={(props) => setIsError(props)}
          />
        </Grid> */}
      </Grid>
    </>
  );
}
