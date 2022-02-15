import PlayerList from "../PlayerList";
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
interface LeaveReady {
  setIsError: (isError: boolean) => void;
  lobby: Lobby;
  playerPiece: string;
  playerName: string;
  playerId: string;
  isReady: boolean;
  isError: boolean;
  handleLeave: () => void;
  setIsReady: (isReady: boolean) => void;
}
export default function LeaveReady({
  playerPiece,
  playerName,
  playerId,
  setIsError,
  lobby,
  isReady,
  setIsReady,
  isError,
  handleLeave,
}: LeaveReady) {
  const volume: number = useContext(VolumeContext);
  const [playReadySound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/snareForwardButton.mp3",
    { volume: volume }
  );
  const [playUnreadySound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/floorDrumBackButton.mp3",
    { volume: volume }
  );
  const handleReadyClick = () => {
    if (playerPiece) {
      setIsError(false);
      const reqBody = {
        player: {
          name: playerName,
          piece: playerPiece,
          playerId: playerId,
        },
        lobbyId: lobby?.lobbyId,
        hostSid: lobby?.hostSid,
      };
      playerReady(reqBody);
      !isReady ? playReadySound() : playUnreadySound();

      lobby.players.map((player) => {
        if (player.name === playerName) {
          setIsReady(!player.isReady);
          return (player.isReady = !player.isReady);
        }
      });
    } else {
      setIsError(true);
    }
  };
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      {isError && (
        <Grid
          container
          textAlign="center"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <Typography
              sx={{
                color: "red",
                textAlign: "center",
                fontFamily: "Noto Sans, sans-serif",
              }}
            >
              Select a piece.
            </Typography>
          </Grid>
        </Grid>
      )}
      <Grid
        container
        item
        textAlign="center"
        justifyContent="center"
        direction={{ xs: "row", md: "column" }}
        spacing={4}
        sx={{ p: "20px" }}
        alignItems="center"
      >
        <Grid item>
          <CustomButton onClick={() => handleLeave()} message={"Leave"} />
        </Grid>

        <Grid item>
          {" "}
          <CustomButton
            onClick={() => handleReadyClick()}
            message={isReady ? "Cancel" : "Ready"}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
