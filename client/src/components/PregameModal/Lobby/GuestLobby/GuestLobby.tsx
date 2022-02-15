import PlayerList from "../../PlayerList/PlayerList";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import PieceSelector from "../Settings/PieceSelector/PieceSelector";
import { useCookies } from "react-cookie";
import playerReady from "../../../../creators/APICreators/playerReady";
import { Lobby } from "../../../../Models/Lobby";
import CopyLobbyId from "../CopyLobbyId";
import useSound from "use-sound";
import { VolumeContext } from "../../../../storage/VolumeContext";
import CustomButton from "../../../CustomButton";
import LeaveReady from "./LeaveReady";
import VolumeSlider from "../../../VolumeSlider";
interface GuestLobbyProps {
  setPiece: (piece: string) => void;
  playerPiece: string;
  handleLeave: () => void;
  lobby: Lobby;
  playerId: string;
  playerName: string;
  volume: number;
  setVolume: (volume: number) => void;
  setIsGuideOpen: (isGuideOpen: boolean) => void;
}
export default function GuestLobby({
  handleLeave,
  playerPiece,
  setPiece,
  lobby,
  playerId,
  playerName,
  volume,
  setVolume,
  setIsGuideOpen,
}: GuestLobbyProps) {
  const [isReady, setIsReady] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    /*When player clicks a piece while players status is set to ready. Sets players status to false and makes a api 
    call to update players status on server side*/
    lobby?.players?.map((player) => {
      if (player.name === playerName) {
        setIsReady(false);
        return (player.isReady = false);
      }
    });
    const reqBody = {
      player: {
        name: playerName,
        piece: playerPiece,
        playerId: playerId,
      },
      lobbyId: lobby?.lobbyId,
      hostSid: lobby?.hostSid,
    };
    if (isReady) {
      playerReady(reqBody);
    }
  }, [playerPiece]);
  useEffect(() => {
    lobby?.players?.map((player) => {
      if (player.name === playerName) {
        setIsReady(player.isReady);
      }
    });
  }, [lobby]);

  return (
    <>
      <Grid container direction="column" spacing={2} sx={{ p: 2 }}>
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
            <CopyLobbyId lobbyId={lobby.lobbyId} />
          </Grid>
        </Grid>
        <Grid container item direction="row" spacing={0}>
          <Grid
            item
            xs={5}
            md={7}
            textAlign="center"
            container
            alignItems="center"
          >
            <PieceSelector
              playerPiece={playerPiece}
              setPiece={(props) => setPiece(props)}
            />
          </Grid>
          <Grid
            item
            md={1}
            container
            alignItems="center"
            sx={{ display: { xs: "none", sm: "none", md: "flex", lg: "flex" } }}
          >
            <LeaveReady
              playerPiece={playerPiece}
              playerName={playerName}
              setIsError={(props) => {
                setIsError(props);
              }}
              lobby={lobby}
              playerId={playerId}
              isReady={isReady}
              isError={isError}
              handleLeave={() => handleLeave()}
              setIsReady={(props) => setIsReady(props)}
            />
          </Grid>
          <Grid item xs={7} md={4}>
            <PlayerList
              playerId={playerId}
              playerName={playerName}
              players={lobby.players}
              playerPiece={playerPiece}
            />
          </Grid>
        </Grid>
        <Grid
          item
          sx={{ display: { xs: "flex", sm: "flex", md: "none", lg: "none" } }}
        >
          <LeaveReady
            playerPiece={playerPiece}
            playerName={playerName}
            setIsError={(props) => {
              setIsError(props);
            }}
            lobby={lobby}
            playerId={playerId}
            isReady={isReady}
            isError={isError}
            handleLeave={() => handleLeave()}
            setIsReady={(props) => setIsReady(props)}
          />
        </Grid>
      </Grid>
    </>
  );
}
