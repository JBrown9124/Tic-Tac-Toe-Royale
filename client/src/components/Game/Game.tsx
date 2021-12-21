import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { NewMove } from "../../Models/NewMove";
import Board from "./Board/Board";
import { useCookies } from "react-cookie";
import { Player } from "../../Models/Player";
import { useState, useEffect } from "react";
import {Lobby} from "../../Models/Lobby";
import {GameStatus} from "../../Models/GameStatus";
import GameOver from "./GameOver/GameOver"
import StatusBoard from "./StatusBoard/StatusBoard";
interface GameProps {
  newMove: NewMove;
  lobby:Lobby

  gameStatus:GameStatus;
  setGameStatus:(status:GameStatus)=>void;
}
function Game({ newMove, lobby, gameStatus, setGameStatus}: GameProps) {
  const [sessionCookies, setSessionCookies] = useCookies();
  const [playerNumber, setPlayerNumber] = useState(0);
  const [showGameOver, setShowGameOver] = useState(false)

  useEffect(() => {
    if (sessionCookies?.command === "begin") {
      lobby?.players?.map((player: Player) => {
        if (player.name === sessionCookies?.name) {
          return setPlayerNumber(player.playerNumber);
        }
      });
    }
    else if (sessionCookies?.command === "gameover"){
      setShowGameOver(true)
    }
  }, [sessionCookies?.command,lobby]);
  return (
    <>
      <Grid container direction="column">
        <GameOver showGameOver={showGameOver} gameStatus={gameStatus} players={lobby?.players}/>
        <Grid item xs={6}>
          <StatusBoard winBy={lobby?.board?.winBy} gameStatus={gameStatus}players={lobby?.players} />
        </Grid>

        <Grid container item sx={{justifyContent: "center", margin:"auto"}}>
          <Board gameStatus={gameStatus} setGameStatus={(props)=>setGameStatus(props)} lobby={lobby}newMove={newMove} playerNumber={playerNumber} />
        </Grid>
      </Grid>
    </>
  );
}
export default Game;
