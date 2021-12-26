import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { NewMove } from "../../Models/NewMove";
import Board from "./Board/Board";
import { useCookies } from "react-cookie";
import { Player } from "../../Models/Player";
import StatusBoardIn from "../../animators/StatusBoardIn";
import { useState, useEffect } from "react";
import { Lobby } from "../../Models/Lobby";
import { GameStatus } from "../../Models/GameStatus";
import GameOver from "./GameOver/GameOver";
import StatusBoard from "./StatusBoard/StatusBoard";
interface GameProps {
  newMove: NewMove;
  lobby: Lobby;
  gameStatus: GameStatus;
  setGameStatus: (status: GameStatus) => void;
}
function Game({ newMove, lobby, gameStatus, setGameStatus }: GameProps) {
  const [sessionCookies, setSessionCookies] = useCookies();
  const [playerNumber, setPlayerNumber] = useState(0);

  useEffect(() => {
    if (sessionCookies?.command === "begin") {
      lobby?.players?.map((player: Player) => {
        if (player.name === sessionCookies?.name) {
          return setPlayerNumber(player.playerNumber);
        }
      });
    }
  }, [sessionCookies?.command, lobby]);
  return (
    <>
      <Grid container direction="row" spacing={{ md: 0, xs: 2 }}>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent={{ md: "right", xs: "center" }}
          md={2}
        >
          <StatusBoardIn fromX={-100} isVisible={true} delay={800}>
            <StatusBoard
              winBy={lobby?.board?.winBy}
              gameStatus={gameStatus}
              players={lobby?.players}
              playerNumber={playerNumber}
            />
          </StatusBoardIn>
        </Grid>
        <Grid item xs={12} container justifyContent="center" md={8}>
          <Board
            gameStatus={gameStatus}
            setGameStatus={(props) => setGameStatus(props)}
            lobby={lobby}
            newMove={newMove}
            playerNumber={playerNumber}
          />
        </Grid>
      </Grid>
    </>
  );
}
export default Game;
