import PlayerList from "./PlayerList";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import PieceSelector from "./Settings/PieceSelector";
import { useCookies } from "react-cookie";
import playerReady from "../../../creators/APICreators/playerReady";
import { Lobby } from "../../../Models/Lobby";
import CopyLobbyId from "./CopyLobbyId";
import useSound from "use-sound";
import CustomButton from "../../CustomButton";
interface GuestLobbyProps {
  setPiece: (piece: string) => void;
  playerPiece: string;
  handleLeave: () => void;
  lobby: Lobby;
  playerId: string;
  playerName: string;
}
export default function GuestLobby({
  handleLeave,
  playerPiece,
  setPiece,
  lobby,
  playerId,
  playerName,
}: GuestLobbyProps) {
  const [isReady, setIsReady] = useState(false);
  const [isError, setIsError] = useState(false);
  const [playReadySound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/snareForwardButton.mp3"
  );
  const [playUnreadySound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/floorDrumBackButton.mp3"
  );
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
    <>
      <Grid container direction="column" spacing={6} sx={{p:2}}>
        <CopyLobbyId lobbyId={lobby.lobbyId} />
        <Grid container item direction="row" spacing={2}>
          <Grid item xs={12} md={8} textAlign="center">
            <Grid  item
              container
              direction="column"
              textAlign="center"
              justifyContent="center"
              alignItems="center"
              sx={{
                width: { lg: "50%", sm: "100%" },
                margin: "auto",

                p: 2,
              }}>
              <PieceSelector
                playerPiece={playerPiece}
                setPiece={(props) => setPiece(props)}
              />
            </Grid>
            {isError && (
              <Grid container item textAlign="center" justifyContent="center">
                <Typography
                  sx={{
                    color: "red",
                    textAlign: "center",
                    fontFamily: "Bungee Hairline, cursive",
                    fontWeight: 800,
                  }}
                >
                  Select a piece.
                </Typography>
              </Grid>
            )}
            <Grid
              container
              item
              textAlign="center"
              justifyContent="center"
              spacing={4}
              sx={{ p: "20px" }}
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
          <Grid item xs={12} md={4}>
            <PlayerList
              playerId={playerId}
              playerName={playerName}
              players={lobby.players}
              playerPiece={playerPiece}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
