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
import PlayerTurnOrderAnimator from "../../../animators/PlayerTurnOrderAnimator";

interface StatusBoardProps {
  playerPieces: Player[];
  gameStatus: GameStatus;
  winBy: number;

  quitGame: () => void;
  isBoardCreated: boolean;
  isCountDownFinished: boolean;
  setPlayerPieces: (playerPieces: Player[]) => void;
  isHost: boolean;
  playerId: string;
  handleStart: () => void;
}
export default function StatusBoard({
  playerPieces,
  gameStatus,
  winBy,

  quitGame,
  setPlayerPieces,
  isBoardCreated,
  isCountDownFinished,
  isHost,
  playerId,
  handleStart,
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
  const [winner, setWinner] = useState<Player>();
  useEffect(() => {
    if (gameStatus.win.whoWon) {
      setWinner(
        playerPieces.find((playerPiece) => {
          return playerPiece.playerId === gameStatus.win.whoWon;
        })
      );
      if (playerId === gameStatus.win.whoWon) {
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

          bgcolor: "#b4cad1",

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
                    if (player.playerId === gameStatus.win.whoWon) {
                      if (player.playerId === playerId) {
                        return "You Win!";
                      }
                      return `${player.name} Wins!`;
                    }
                  } else if (player.playerId === gameStatus.whoTurn) {
                    if (player.playerId === playerId) {
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
              if (player.playerId === gameStatus.win.whoWon) {
                return player.piece;
              }
            } else if (player.playerId === gameStatus.whoTurn) {
              return player.piece;
            }
          })}
        </Grid>
        <Grid item>
          <Typography sx={{ p: 1 }}>{`Win by ${winBy}`}</Typography>
        </Grid>

        <Grid container direction="column">
          <Grid item>
            <Button onClick={() => quitGame()}>Leave Game</Button>
          </Grid>
          {gameStatus.win.whoWon && isHost && (
            <Grid item>
              <Button onClick={() => handleStart()}>Play Again</Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
}
