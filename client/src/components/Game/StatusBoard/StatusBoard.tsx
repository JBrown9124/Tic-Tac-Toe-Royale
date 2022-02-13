import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Player } from "../../../Models/Player";
import { GameStatus } from "../../../Models/GameStatus";
import { Move } from "../../../Models/Move";
import { useEffect, useState } from "react";
import { useSound } from "use-sound";
import { PowerUp, PowerUps } from "../../../Models/PowerUp";
import CustomButton from "../../CustomButton";
import { statusBoardTurnOrderBackgroundColor } from "../../../themes/theme1";

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
  // setPowerOrMove: (decision: "Power" | "Move") => void;
  setIsUsingPowerUp: (isUsingPowerUp: boolean) => void;
  // powerOrMove: string;
  setSelectedPowerUp: (powerUp: PowerUp) => void;
  setSelectedPowerUpTiles: (powerUpTiles: Move[]) => void;
  isUsingPowerUp: boolean;
  inventory: PowerUps;
  sizeOfBoardPiece: { mobile: string; desktop: string };
  boardSize:number
}
export default function StatusBoard({
  playerPieces,
  gameStatus,
  winBy,
  sizeOfBoardPiece,
  quitGame,
  setPlayerPieces,
  isBoardCreated,
  isCountDownFinished,
  isHost,
  playerId,
  handleStart,
  // setPowerOrMove,
  setIsUsingPowerUp,
  setSelectedPowerUp,
  setSelectedPowerUpTiles,
  // powerOrMove,
  isUsingPowerUp,
  inventory,
  boardSize
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

          bgcolor: statusBoardTurnOrderBackgroundColor,
          border: "solid #ec407a 1px",
          height:
          boardSize === 6
            ? 762
            : boardSize === 5
            ? 554.4
            : boardSize === 4
            ? 457.5
            : boardSize === 3
            ? 359.5
            : 748,
          boxShadow: 10,
        }}
        direction="column"
        textAlign="center"
      
        justifyContent="center"
    
      >
        <Grid container direction="column" item>
          <Grid item sx={{ p: 0 }}>
            {gameStatus.win.whoWon === "tie" ? (
              <Typography variant="h6" sx={{ fontFamily: "Cinzel, serif" }}>
                Its a tie!
              </Typography>
            ) : (
              <Typography variant="h6" sx={{ fontFamily: "Cinzel, serif" }}>
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
        </Grid>
        <Grid container direction="column" item sx={{marginTop:12}}>
          <Grid>
            <Typography sx={{ fontFamily: "Cinzel, serif" }} variant="h6">
              Game Stats
            </Typography>
            <Typography>Win by {winBy}</Typography>
            <Typography>{playerPieces.length} players</Typography>
          </Grid>
        </Grid>
        <Grid container direction="column" item sx={{marginTop:12}}>
          <CustomButton
            sx={{ fontSize: "13px", height: "30px" }}
            onClick={() => quitGame()}
            message={"Power Information"}
          />
        </Grid>
        {/*       
        {isUsingPowerUp ? (
          <Grid item>
            <Typography
              sx={{
                fontFamily: "Noto Sans, sans-serif",

                p: 1,
              }}
            >
              Select the currently selected power to make a move instead!
            </Typography>
          </Grid>
        ) : (
          <Grid item>
            <Typography
              sx={{
                fontFamily: "Noto Sans, sans-serif",
                p: 1,
              }}
            >
              Make a move or select a power!
            </Typography>
          </Grid>
        )} */}
        <Grid
          container
          direction="row"
          sx={{ p: 1, marginTop:12}}
          item
          spacing={2}
          justifyContent={"center"}
        >
          <Grid item>
            <CustomButton
              sx={{ fontSize: "13px", height: "30px" }}
              onClick={() => quitGame()}
              message={"Leave Game"}
            />
          </Grid>
          {gameStatus.win.whoWon && isHost && (
            <Grid item>
              <CustomButton
                sx={{ fontSize: "13px", height: "30px" }}
                message={"Play Again"}
                onClick={() => handleStart()}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
}
