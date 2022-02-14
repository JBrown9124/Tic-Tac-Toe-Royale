import Settings from "../Settings/Settings";
import Grid from "@mui/material/Grid";
import { useState,} from "react";
import sendHostPiece from "../../../../creators/HostLobbyCreators/sendHostPiece";
import { Player } from "../../../../Models/Player";
import { Lobby } from "../../../../Models/Lobby";
import { RgbaColor } from "react-colorful";
import CopyLobbyId from "../CopyLobbyId";
import PieceSelector from "../Settings/PieceSelector/PieceSelector";

import RightTopHalfPanel from "./RightTopHalfPanel";
import BottomPanel from "./BottomPanel";

import VolumeSlider from "../../../VolumeSlider";
import CustomButton from "../../../CustomButton";
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
  setIsGuideOpen: (isGuideOpen: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
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
  setIsGuideOpen,
  volume,
  setVolume,
}: PlayerListProps) {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const volume = useContext(VolumeContext)
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
        <Grid
          item
          container
          direction="row"
          textAlign="right"
          justifyContent="right"
          spacing={2}
        >
          <Grid item>
            <VolumeSlider
              volume={volume}
              setVolume={(props) => setVolume(props)}
            />
          </Grid>
          <Grid item>
            {" "}
            <CustomButton
              sx={{
                height: "25px",
                fontSize: "12px",
              }}
              message={"Guide"}
              onClick={() => setIsGuideOpen(true)}
            />
          </Grid>
          <Grid item>
            <CopyLobbyId lobbyId={lobbyId} />
          </Grid>
        </Grid>

        <Grid item container direction="row" justifyContent="center">
          <Grid
            item
            sx={{ p: 1, marginTop: 0 }}
            md={7}
            container
            direction="column"
            spacing={4}
          >
            <Grid item sx={{}}>
              <Settings
                setLobby={setLobby}
                players={players}
                lobbyId={lobbyId}
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
            <Grid item sx={{ p: 0 }}>
              <PieceSelector
                playerPiece={playerPiece}
                setPiece={(props) => setPiece(props)}
              />
            </Grid>
          </Grid>
          <Grid item sx={{ p: 0 }} md={1} container alignItems="center">
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
          <Grid item md={4}>
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
      </Grid>
    </>
  );
}
