import PlayerList from "./PlayerList";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Player } from "../../../Models/Player";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import PieceSelector from "./Settings/PieceSelector";
import { useCookies } from "react-cookie";
import playerReady from "../../../creators/playerReady";
import { Lobby } from "../../../Models/Lobby";
import CopyLobbyId from "./CopyLobbyId";
import useSound from 'use-sound'
interface GuestLobbyProps {
  setPiece: (piece: string) => void;
  playerPiece: string;
  handleLeave: () => void;
  lobby: Lobby;
}
export default function GuestLobby({
  handleLeave,
  playerPiece,
  setPiece,
  lobby,
}: GuestLobbyProps) {
  const [sessionCookies, setSessionCookies] = useCookies();
  const [isReady, setIsReady] = useState(false);
  const [isError, setIsError] = useState(false);
  const [playReady] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/snareForwardButton.mp3", 
  );
  const [playUnready]= useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/floorDrumBackButton.mp3", 
  );
  useEffect(()=>{
    lobby?.players?.map((player) => {
      if (player.name === sessionCookies?.name) {
        setIsReady(false);
        return (player.isReady = false);
      }
    });
    const reqBody = {
      player: { name: sessionCookies?.name, piece: playerPiece },
      lobbyId: lobby?.lobbyId,
      hostSid: lobby?.hostSid,
    };
    if (isReady){
    playerReady(reqBody);}
  },[playerPiece])
  useEffect(() => {
    lobby?.players?.map((player) => {
      if (player.name === sessionCookies?.name) {
        setIsReady(player.isReady);
        
      }
    });
  }, [lobby]);
  const handleReady = async () => {
    if (playerPiece) {
      setIsError(false);
      const reqBody = {
        player: { name: sessionCookies?.name, piece: playerPiece },
        lobbyId: lobby?.lobbyId,
        hostSid: lobby?.hostSid,
      };
      playerReady(reqBody);
      !isReady ? playReady():playUnready()
      
      lobby.players.map((player) => {
        if (player.name === sessionCookies?.name) {
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
      <Grid container direction="column" spacing={6}>
        <CopyLobbyId />
        <Grid container item direction="row" spacing={2}>
          <Grid item xs={12} md={6} textAlign="center">
            <PieceSelector
              playerPiece={playerPiece}
              setPiece={(props) => setPiece(props)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PlayerList players={lobby?.players} playerPiece={playerPiece} />
          </Grid>
        </Grid>
        {isError && (
          <Grid container item textAlign="center" justifyContent="center">
            <Typography sx={{color:"red", textAlign:"center"}}>Select a piece.</Typography>
          </Grid>
        )}
        <Grid
          container
          item
          textAlign="center"
          justifyContent="center"
          spacing={2}
        >
          <Grid item>
            <Button onClick={() => handleLeave()}>Leave</Button>
          </Grid>

          <Grid item>
            {" "}
            <Button onClick={() => handleReady()}>
              {isReady ? "Cancel" : "Ready"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
