import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { NewMove } from "../../Models/NewMove";
import Board from "./Board/Board";
import { useCookies } from "react-cookie";
import { Player } from "../../Models/Player";
import { useState, useEffect } from "react";
import StatusBoard from "./StatusBoard/StatusBoard";
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
      <Grid container direction="column">
        <Grid item xs={6}>
          <StatusBoard />
        </Grid>

        <Grid container item sx={{justifyContent: "center", margin:"auto"}}>
          <Board newMove={newMove} playerNumber={playerNumber} />
        </Grid>
      </Grid>
    </>
  );
}
export default Game;
