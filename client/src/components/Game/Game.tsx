import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { NewMove } from "../../Models/NewMove";
import Board from "./Board/Board";
import { useCookies } from "react-cookie";
import { Player } from "../../Models/Player";
import { useState, useEffect } from "react";
interface GameProps {
  newMove: NewMove;
}
function Game({ newMove }: GameProps) {
  const [sessionCookies, setSessionCookies] = useCookies();
  const [playerNumber, setPlayerNumber] = useState(0);

  useEffect(() => {
    if (sessionCookies?.command === "begin") {
      sessionCookies?.lobby?.players?.map((player: Player) => {
        if (player.name === sessionCookies?.name) {
          return setPlayerNumber(player.playerNumber);
        }
      });
    }
  }, [sessionCookies?.command]);
  return (
    <>
      <Grid direction="column">
        <Grid item>
          <Typography variant="h2" sx={{ textAlign: "center" }}>
           
            {sessionCookies?.lobby?.players?.map((player: Player) => {
              if (sessionCookies.gameStatus.whoWon) {
                if (player.playerNumber === sessionCookies.gameStatus.whoWon) {
                  return `${player.name} Wins!`;
                }
              } else if (
                player.playerNumber === sessionCookies.gameStatus.whoTurn
              )
                return `${player.name}'s Turn!`;
            })}
          </Typography>
        </Grid>
        <Grid item>
          <Board newMove={newMove} playerNumber={playerNumber} />
        </Grid>
      </Grid>
    </>
  );
}
export default Game;
