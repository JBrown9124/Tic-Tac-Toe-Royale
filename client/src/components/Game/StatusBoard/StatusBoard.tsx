import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useCookies } from "react-cookie";
import { Player } from "../../../Models/Player";
import { GameStatus } from "../../../Models/GameStatus";
import createPiece from "../../../storage/createPiece";
import { sizeOfPiece } from "../../../storage/sizeOfPiece";
import { useEffect } from "react";
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
  const handleLeaveGame = () => {
    playLeave();
    setSessionCookies("command", "leave", { path: "/" });
  };
  const [playLeave] = useSound(
    process.env.PUBLIC_URL + "/assets/sounds/floorDrumBackButton.mp3"
  );
  const [startWin] = useSound(
    process.env.PUBLIC_URL + "/assets/sounds/winnerSound.mp3"
  );
  const [startGameOver] = useSound(
    process.env.PUBLIC_URL + "/assets/sounds/darkGameOver.mp3"
  );
  const pieces = createPiece("black");
  useEffect(() => {
    players?.map((player: Player) => {
      if (gameStatus?.win?.whoWon) {
        if (playerNumber === gameStatus?.win?.whoWon) {
          return startWin();
        }
        else {
          return startGameOver();
        }
      } 
    });
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
          <Typography>{`Win by ${winBy}`}</Typography>
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
