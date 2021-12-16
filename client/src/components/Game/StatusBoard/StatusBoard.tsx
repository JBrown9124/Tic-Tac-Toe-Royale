import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useCookies } from "react-cookie";
import { Player } from "../../../Models/Player";
import {GameStatus} from "../../../Models/GameStatus";
interface StatusBoardProps{
  players: Player[];
  gameStatus: GameStatus;
}
export default function StatusBoard({players, gameStatus}:StatusBoardProps) {
  const [sessionCookies, setSessionCookies] = useCookies();
  return (
    <>
      <Grid
        container
        sx={{
          background: "white",
          borderRadius: "15px",
          padding: "5px",
          position: "absolute",
          width: "10%",
          top: "50%",
          left: "50%",
          transform: "translate(-400%, -200%)",
          overflow: "auto",

          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
        }}
        direction="column"
        textAlign="center"
      >
        <Grid item>
          <Typography variant="h6">
            {players?.map((player: Player) => {
              if (gameStatus.whoWon) {
                if (player.playerNumber === gameStatus.whoWon) {
                  return `${player.name} Wins!`;
                }
              } else if (
                player.playerNumber === gameStatus.whoTurn
              )
                return `${player.name}'s Turn` ;
            })}
          </Typography>
        </Grid>
    
        <Grid item>
          {" "}
          <Typography>{`Win by ${sessionCookies?.lobby?.board?.winBy}`}</Typography>
        </Grid>
      </Grid>
    </>
  );
}
