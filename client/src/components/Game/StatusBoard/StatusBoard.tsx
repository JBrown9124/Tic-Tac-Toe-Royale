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
import { Divider } from "@mui/material";

import TurnStatus from "./TurnStatus";

interface StatusBoardProps {
  playerPieces: Player[];
  gameStatus: GameStatus;
  winBy: number;
  displayPiece: JSX.Element | string;
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
  boardSize: number;
  selectedPowerUp: PowerUp;
  setIsGuideOpen: (isGuideOpen: boolean) => void;
}
export default function StatusBoard({
  playerPieces,
  gameStatus,
  winBy,
  displayPiece,
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
  selectedPowerUp,
  inventory,
  boardSize,
  setIsGuideOpen,
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
          overflowX: "hidden",
          overflowY: "auto",
          bgcolor: statusBoardTurnOrderBackgroundColor,
          border: "solid #ec407a 1px",
          height: { xs: 150, sm: 150, md: 150, lg: 855 },
          width: { lg: 150 },
          // boardSize === 6
          //   ? 780
          //   : boardSize === 5
          //   ? 554.4
          //   : boardSize === 4
          //   ? 457.5
          //   : boardSize === 3
          //   ? 359.5
          //   : 760,
          boxShadow: 10,
        }}
        direction={{ xs: "row", sm: "row", md: "row", lg: "column" }}
        textAlign="center"
      >
        <Grid item xs={3} sm={3} md={3} lg={4}  container alignItems="center" justifyContent="center">
          <TurnStatus
            playerPieces={playerPieces}
            playerId={playerId}
            gameStatus={gameStatus}
          />
        </Grid>
        <Divider
          orientation={"horizontal"}
          sx={{
            background: "#ec407a",
            display: { sm: "none", xs: "none", md: "none", lg: "flex" },
          }}
        />
        <Divider
          orientation={"vertical"}
          sx={{
            background: "#ec407a",
            display: { sm: "flex", xs: "flex", md: "flex", lg: "none" },
          }}
        />
        <Grid
          container
          direction="column"
          item
          sx={{ marginTop: { xs: 0, sm: 0, md: 0, lg: 0 } }}
          xs={3}
          sm={3}
          md={3}
          lg={3}
          justifyContent="center"
        >
          <Grid item>
            <Typography sx={{ fontFamily: "Cinzel, serif", p: 0 }} variant="h6">
              Win by {winBy}
            </Typography>
          </Grid>
        </Grid>
        <Divider
          orientation={"horizontal"}
          sx={{
            background: "#ec407a",
            display: { sm: "none", xs: "none", md: "none", lg: "flex" },
          }}
        />
        <Divider
          orientation={"vertical"}
          sx={{
            background: "#ec407a",
            display: { sm: "flex", xs: "flex", md: "flex", lg: "none" },
          }}
        />
        <Grid
         justifyContent="center"
          container
          direction="column"
          item
          sx={{ marginTop: { xs: 0, sm: 0, md: 0, lg: 0 } }}
          xs={3}
          sm={3}
          md={3}
          lg={3}
        >
          <Grid item>
            <Typography
              sx={{
                fontFamily: "Cinzel, serif",
                fontSize: { xs: "1rem", sm: "1rem", md: "1rem", lg: "1.3rem" },
              }}
              variant="h6"
            >
              Selection
            </Typography>
          </Grid>
          <Grid item sx={{ p: 1 }}>
            {isUsingPowerUp ? (
              <img
                style={{ width: "50px", height: "50px" }}
                src={selectedPowerUp.imgUrl}
                alt={selectedPowerUp.name}
              />
            ) : (
              displayPiece
            )}
          </Grid>
          <Grid item sx={{ p: 0 }}>
            <Typography
              sx={{
                fontFamily: "Cinzel, serif",
                fontSize: {
                  xs: ".9rem",
                  sm: ".9rem",
                  md: ".9rem",
                  lg: "1.1rem",
                },
              }}
            >
              {isUsingPowerUp ? `${selectedPowerUp.name}` : `Move`}
            </Typography>
          </Grid>
        </Grid>
        <Divider
          orientation={"horizontal"}
          sx={{
            background: "#ec407a",
            display: { sm: "none", xs: "none", md: "none", lg: "flex" },
          }}
        />
        <Divider
          orientation={"vertical"}
          sx={{
            background: "#ec407a",
            display: { sm: "flex", xs: "flex", md: "flex", lg: "none" },
          }}
        />
        <Grid
          container
          direction="column"
          justifyContent="center"
          sx={{ p: 0, marginTop: { xs: 0, sm: 0, md: 0, lg: 1 } }}
          item
          xs={2}
          sm={2}
          md={2}
          lg={1}
        >
          {gameStatus.win.whoWon && isHost && (
            <Grid item sx={{}}>
              <CustomButton
                sx={{ fontSize: "13px", height: "30px" }}
                message={"Play"}
                onClick={() => handleStart()}
              />
            </Grid>
          )}
          <Grid item sx={{ p: 2 }}>
            <CustomButton
              sx={{ fontSize: "13px", height: "30px" }}
              onClick={() => setIsGuideOpen(true)}
              message={"Guide"}
            />
          </Grid>
          <Grid item>
            <CustomButton
              sx={{ fontSize: "13px", height: "30px" }}
              onClick={() => quitGame()}
              message={"Leave"}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
