import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useCookies } from "react-cookie";
import { Player } from "../../../Models/Player";
import { GameStatus } from "../../../Models/GameStatus";
import createPiece from "../../../storage/createPiece";
import Button from "@mui/material/Button";
interface StatusBoardProps {
  players: Player[];
  gameStatus: GameStatus;
  winBy: number;
}
export default function StatusBoard({
  players,
  gameStatus,
  winBy,
}: StatusBoardProps) {
  const [sessionCookies, setSessionCookies, removeSessionCookies] = useCookies();
  const handleLeaveGame = ()=>{
    removeSessionCookies("command");

  removeSessionCookies("lobbyId");
  removeSessionCookies("board");
  }
  const pieces = createPiece("black");
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
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h6">
              {players?.map((player: Player) => {
                if (gameStatus?.win?.whoWon) {
                  if (player.playerNumber === gameStatus?.win?.whoWon) {
                    return `${player.name} Wins!`;
                  }
                } else if (player.playerNumber === gameStatus?.whoTurn)
                  return `${player.name}'s Turn`;
              })}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          {players?.map((player) => {
            if (gameStatus?.win?.whoWon) {
              if (player?.playerNumber === gameStatus?.win?.whoWon) {
                if (player?.piece?.length>15){
                  return <img src={player.piece} alt={player.piece} style={{width:"40px", height: "40px"}}/>
                }
                return pieces.map((piece) => {
                  if (piece.name === player.piece) return piece.value;
                });
              }
            } else if (player?.playerNumber === gameStatus?.whoTurn) {
              if (player?.piece?.length>15){
                return <img src={player.piece} alt={player.piece} style={{width:"40px", height: "40px"}}/>
              }
              return pieces.map((piece) => {
                if (piece.name === player.piece) return piece.value;
              });
            }
          })}
        </Grid>
        <Grid item>
          {" "}
          <Typography>{`Win by ${winBy}`}</Typography>
        </Grid>
        {gameStatus?.win?.whoWon &&
        <Grid container direction="column">
          <Grid item>
            <Button onClick={()=> handleLeaveGame()}>Leave Game</Button>
          </Grid>
          </Grid>}
      </Grid>
    </>
  );
}
