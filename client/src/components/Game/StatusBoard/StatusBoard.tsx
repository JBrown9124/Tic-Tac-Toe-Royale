import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useCookies } from "react-cookie";
import { Player } from "../../../Models/Player";
import { GameStatus } from "../../../Models/GameStatus";
import createPiece from "../../../creators/BoardCreators/createPiece";
import { sizeOfPiece } from "../../../creators/BoardCreators/sizeOfPiece";
import { useEffect, useState } from "react";
import { useSound } from "use-sound";
import Button from "@mui/material/Button";
interface StatusBoardProps {
  playerPieces: Player[];
  gameStatus: GameStatus;
  winBy: number;
  turnNumber: number;
  quitGame: () => void;
}
export default function StatusBoard({
  playerPieces,
  gameStatus,
  winBy,
  turnNumber,
  quitGame,
}: StatusBoardProps) {
  
  const [startWinSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/winnerSound.mp3"
  );
  const [startGameOverSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/darkGameOver.mp3"
  );
  const [startTieSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/tie.mp3"
  );
 

  useEffect(() => {
    if (gameStatus.win.whoWon) {
      if (turnNumber === gameStatus.win.whoWon) {
        startWinSound();
      } else if (gameStatus.win.whoWon !== "tie") {
        startGameOverSound();
      } else {
        startTieSound();
      }
    }
  }, [gameStatus?.win?.whoWon]);
  return (
    <>
      <Grid
        container
        sx={{
         
          borderRadius: "15px",
          padding: "5px",

          bgcolor: "#dedfe8",
          border: "1px solid #000",
          boxShadow: 10,
        }}
        direction="column"
        textAlign="center"
      >
        <Grid container direction="column">
          <Grid item sx={{ p: 1 }}>
            {gameStatus.win.whoWon === "tie" ? (
              <Typography variant="h6">Its a tie!</Typography>
            ) : (
              <Typography variant="h6">
                {playerPieces.map((player: Player) => {
                  if (gameStatus.win.whoWon) {
                    if (player.turnNumber === gameStatus.win.whoWon) {
                      if (player.turnNumber === turnNumber) {
                        return "You Win!";
                      }
                      return `${player.name} Wins!`;
                    }
                  } else if (player.turnNumber === gameStatus.whoTurn) {
                    if (player.turnNumber === turnNumber) {
                      return "Your Turn";
                    }
                    return `${player.name}'s Turn`;
                  }
                })}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid item>
          {playerPieces.map((player, idx) => {
            if (gameStatus.win.whoWon) {
              if (player.turnNumber === gameStatus.win.whoWon ) {
                return player.piece;
              }
            } else if (player.turnNumber === gameStatus.whoTurn) {
              return player.piece;
            }
          })}
        </Grid>
        <Grid item>
          {" "}
          <Typography sx={{ p: 1 }}>{`Win by ${winBy}`}</Typography>
        </Grid>

        <Grid container direction="column">
          <Grid item>
            <Button onClick={() => quitGame()}>Leave Game</Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
