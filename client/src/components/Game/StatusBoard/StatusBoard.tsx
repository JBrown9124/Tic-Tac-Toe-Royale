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
  players: Player[];
  gameStatus: GameStatus;
  winBy: number;
  playerNumber: number;
}
export default function StatusBoard({
  players,
  gameStatus,
  winBy,
  playerNumber,
}: StatusBoardProps) {
  const [sessionCookies, setSessionCookies, removeSessionCookies] =
    useCookies();

  const [playLeaveSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/floorDrumBackButton.mp3"
  );
  const [startWinSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/winnerSound.mp3"
  );
  const [startGameOverSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/darkGameOver.mp3"
  );
  const [startTieSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/tie.mp3"
  );
  const pieces = createPiece("black");
  const handleLeaveGame = () => {
    playLeaveSound();
    setSessionCookies("command", "leave", { path: "/" });
  };
 
  useEffect(() => {
    if (gameStatus?.win?.whoWon) {
      if (playerNumber === gameStatus?.win?.whoWon) {
        startWinSound();
      } else if (gameStatus?.win?.whoWon !== "tie") {
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
          background: "white",
          borderRadius: "15px",
          padding: "5px",

          bgcolor: "background.paper",
          border: "1px solid #000",
          boxShadow: 10,
        }}
        direction="column"
        textAlign="center"
      >
        <Grid container direction="column">
          <Grid item sx={{ p: 1 }}>
            {gameStatus?.win?.whoWon === "tie" ? (
              <Typography variant="h6">Its a tie!</Typography>
            ) : (
              <Typography variant="h6">
                {players?.map((player: Player) => {
                  if (gameStatus?.win?.whoWon) {
                    if (player.playerNumber === gameStatus?.win?.whoWon) {
                      if (player.playerNumber === playerNumber) {
                        return "You Win!";
                      }
                      return `${player.name} Wins!`;
                    }
                  } else if (player.playerNumber === gameStatus?.whoTurn) {
                    if (player.playerNumber === playerNumber) {
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
          {players?.map((player) => {
            if (gameStatus?.win?.whoWon) {
              if (player?.playerNumber === gameStatus?.win?.whoWon) {
                if (player?.piece?.length > 15) {
                  return (
                    <img
                      src={player.piece}
                      alt={player.piece}
                      style={{ width: sizeOfPiece, height: sizeOfPiece }}
                    />
                  );
                }
                return pieces.map((piece) => {
                  if (piece.name === player.piece) return piece.value;
                });
              }
            } else if (player?.playerNumber === gameStatus?.whoTurn) {
              if (player?.piece?.length > 15) {
                return (
                  <img
                    src={player.piece}
                    alt={player.piece}
                    style={{ width: sizeOfPiece, height: sizeOfPiece }}
                  />
                );
              }
              return pieces.map((piece) => {
                if (piece.name === player.piece) return piece.value;
              });
            }
          })}
        </Grid>
        <Grid item>
          {" "}
          <Typography sx={{ p: 1 }}>{`Win by ${winBy}`}</Typography>
        </Grid>
        {gameStatus?.win?.whoWon && (
          <Grid container direction="column">
            <Grid item>
              <Button onClick={() => handleLeaveGame()}>Leave Game</Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
}
