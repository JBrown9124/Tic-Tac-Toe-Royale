import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Player } from "../../../Models/Player";
import { GameStatus } from "../../../Models/GameStatus";
import { Move } from "../../../Models/Move";
import { useEffect, useState } from "react";
import { useSound } from "use-sound";
import { PowerUp, PowerUps } from "../../../Models/PowerUp";
import CustomButton from "../../CustomButton";
import { backgroundColor } from "../../../themes/theme1";

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
  setPowerOrMove: (decision: "Power" | "Move") => void;
  setIsUsingPowerUp: (isUsingPowerUp: boolean) => void;
  powerOrMove: string;
  setSelectedPowerUp: (powerUp: PowerUp) => void;
  setSelectedPowerUpTiles: (powerUpTiles: Move[]) => void;
  isUsingPowerUp: boolean;
  inventory: PowerUps
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
  setPowerOrMove,
  setIsUsingPowerUp,
  setSelectedPowerUp,
  setSelectedPowerUpTiles,
  powerOrMove,
  isUsingPowerUp,
  inventory
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
  const handleMoveSelect = () => {
    setPowerOrMove("Move");
    setIsUsingPowerUp(false);
    setSelectedPowerUp({
      value: 0,
      name: "",
      description: "",
      imgUrl: "",
  
      rules: {
        affectsCaster: false,
        direction: {
          isVertical: false,
          isHorizontal: false,
          isDiagonal: false,
        },
        castAnywhere: false,
        tilesAffected: 0,
        mustBeEmptyTile: false,
        areaShape: "line",
      },
      selectColor: "",
      quantity: 0
    });
    setSelectedPowerUpTiles([]);
  };
  return (
    <>
      <Grid
        container
        sx={{
          borderRadius: "15px",

          bgcolor: backgroundColor,
          border: "solid black 1px",
          boxShadow: 10,
        }}
        direction="column"
        textAlign="center"
      >
        <Grid container direction="column">
          <Grid item sx={{ p: 1 }}>
            {gameStatus.win.whoWon === "tie" ? (
              <Typography
                variant="h6"
                sx={{ fontFamily: "Bungee Hairline, cursive", fontWeight: 800 }}
              >
                Its a tie!
              </Typography>
            ) : (
              <Typography
                variant="h6"
                sx={{ fontFamily: "Bungee Hairline, cursive", fontWeight: 800 }}
              >
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
          <Typography
            sx={{
              fontFamily: "Bungee Hairline, cursive",
              fontWeight: 800,
              p: 1,
            }}
          >{`Win by ${winBy}`}</Typography>
        </Grid>

        <Grid container direction="row" sx={{ p: 3 }} spacing={2}>
          <Grid item xs={6}>
            <CustomButton
              sx={{
                fontSize: "13px",
                height: "50px",
                border: powerOrMove === "Power" ? "solid 2px blue" : "none",
              }}
              onClick={() => setPowerOrMove("Power")}
              message={"Power"}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomButton
              sx={{
                fontSize: "13px",
                height: "50px",
                border: powerOrMove === "Move" ? "solid 2px blue" : "none",
              }}
              message={"Move"}
              onClick={() => handleMoveSelect()}
            />
          </Grid>
        </Grid>
        {powerOrMove === "Power"? (
          <Grid item>
            <Typography
              sx={{
                fontFamily: "Bungee Hairline, cursive",
                fontWeight: 800,
                p: 1,
              }}
            >
              Select a power from below!
            </Typography>
          </Grid>
        ) : (
          <Grid item>
            <Typography
              sx={{
                fontFamily: "Bungee Hairline, cursive",
                fontWeight: 800,
                p: 1,
              }}
            >
              Make a move to aquire more powers!
            </Typography>
          </Grid>
        )}
        <Grid container direction="column" sx={{ p: 1 }} spacing={2}>
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
