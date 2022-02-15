import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Player } from "../../../Models/Player";
import { GameStatus } from "../../../Models/GameStatus";
import { Move } from "../../../Models/Move";
import { useEffect, useState, useContext } from "react";
import { useSound } from "use-sound";
import { VolumeContext } from "../../../storage/VolumeContext";
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
  const volume = useContext(VolumeContext);
  const [startWinSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/winnerSound.mp3",
    { volume: volume }
  );
  const [startGameOverSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/darkGameOver.mp3",
    { volume: volume }
  );
  const [startTieSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/tie.mp3",
    { volume: volume }
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
          borderRadius: { xs: "0px", sm: "0px", md: "0px", lg: "5px" },
          overflowX: "hidden",
          overflowY: "auto",
          backgroundColor: "#519657",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='church-on-sunday' fill='%2381c784' fill-opacity='0.29'%3E%3Cpath d='M77.17 0H80v2.83l-.1.1A39.9 39.9 0 0 1 74.64 20a39.9 39.9 0 0 1 5.24 17.06l.11.11v2.89c-.01 6.9-1.8 13.79-5.35 19.94A39.96 39.96 0 0 1 80 79.94V80h-2.83L66.84 69.66a39.83 39.83 0 0 1-24.1 10.25l.09.09h-5.66l.1-.1c-8.7-.58-17.22-4-24.1-10.23L2.82 80H0V79.94c.01-6.9 1.8-13.8 5.35-19.94A39.96 39.96 0 0 1 0 40.06V37.17l.1-.1A39.9 39.9 0 0 1 5.36 20 39.9 39.9 0 0 1 .1 2.94L0 2.83V0h2.83l-.1.1a39.83 39.83 0 0 1 24.1 10.24L37.18 0H40c0 6.92-1.78 13.83-5.35 20A39.96 39.96 0 0 1 40 40c0-6.92 1.78-13.83 5.35-20A39.96 39.96 0 0 1 40 0h2.83l10.33 10.34A39.83 39.83 0 0 1 77.26.09L77.17 0zm.77 77.94c-.3-5.52-1.8-11-4.49-16a40.18 40.18 0 0 1-5.17 6.34l9.66 9.66zm-12.52-9.7l-6.83-6.83-5.46 5.46-1.41 1.41-9.66 9.66c8.4-.45 16.69-3.68 23.36-9.7zm-23.07 6.58l7.99-7.98a40.05 40.05 0 0 1-3.79-4.9 37.88 37.88 0 0 0-4.2 12.88zM47.68 60a37.98 37.98 0 0 0 4.07 5.42L57.17 60l-5.42-5.42A38 38 0 0 0 47.68 60zm2.66-6.84a40.06 40.06 0 0 0-3.79 4.9 37.88 37.88 0 0 1-4.2-12.88l7.99 7.98zm1.38-1.44l1.41 1.41 5.46 5.46 6.83-6.84a37.85 37.85 0 0 0-23.36-9.7l9.66 9.67zM60 60l6.87 6.87A38.1 38.1 0 0 0 72.32 60a38.11 38.11 0 0 0-5.45-6.87L60 60zm-14.65 0a39.9 39.9 0 0 0-5.24 17.06l-.11.11-.1-.1A39.9 39.9 0 0 0 34.64 60a39.9 39.9 0 0 0 5.24-17.06l.11-.11.1.1A39.9 39.9 0 0 0 45.36 60zm9.23-48.25a37.85 37.85 0 0 1 23.36-9.7l-9.66 9.67-1.41 1.41-5.46 5.46-6.83-6.84zm13.67 13.67L62.83 20l5.42-5.42A38 38 0 0 1 72.32 20a37.98 37.98 0 0 1-4.07 5.42zm5.2-3.47a40.05 40.05 0 0 1-3.79 4.89l7.99 7.98c-.61-4.45-2.01-8.82-4.2-12.87zm-6.58 4.92l1.41 1.41 9.66 9.66a37.85 37.85 0 0 1-23.36-9.7l6.83-6.83 5.46 5.46zM53.13 13.13L60 20l-6.87 6.87A38.11 38.11 0 0 1 47.68 20a38.1 38.1 0 0 1 5.45-6.87zm-1.41-1.41l-9.66-9.66c.3 5.52 1.8 11 4.49 16a40.18 40.18 0 0 1 5.17-6.34zm-9.66 26.22c.3-5.52 1.8-11 4.49-16a40.18 40.18 0 0 0 5.17 6.34l-9.66 9.66zm26.22 13.78l9.66-9.66c-.3 5.52-1.8 11-4.49 16a40.18 40.18 0 0 0-5.17-6.34zm8.98-11.81L66.84 50.34a39.83 39.83 0 0 0-24.1-10.25l10.42-10.43a39.83 39.83 0 0 0 24.1 10.25zm-7.6-26.75a40.06 40.06 0 0 1 3.79 4.9 37.88 37.88 0 0 0 4.2-12.88l-7.99 7.98zm-31.72 28.9c-8.4.45-16.69 3.68-23.36 9.7l6.83 6.83 5.46-5.46 1.41-1.41 9.66-9.66zM22.83 60l5.42 5.42c1.54-1.7 2.9-3.52 4.07-5.42a38 38 0 0 0-4.07-5.42L22.83 60zm5.45 8.28l-1.41-1.41-5.46-5.46-6.83 6.84a37.85 37.85 0 0 0 23.36 9.7l-9.66-9.67zm9.37 6.54l-7.99-7.98a40.05 40.05 0 0 0 3.79-4.9 37.88 37.88 0 0 1 4.2 12.88zM20 60l-6.87-6.87A38.11 38.11 0 0 0 7.68 60a38.11 38.11 0 0 0 5.45 6.87L20 60zm17.26-19.9L26.84 29.65a39.83 39.83 0 0 1-24.1 10.25l10.42 10.43a39.83 39.83 0 0 1 24.1-10.25zm-35.2 1.96l9.66 9.66a40.18 40.18 0 0 0-5.17 6.33c-2.7-5-4.2-10.47-4.5-16zm4.49 19.89c-2.7 5-4.2 10.47-4.5 16l9.67-9.67a40.18 40.18 0 0 1-5.17-6.33zm31.1-16.77c-.61 4.45-2.01 8.82-4.2 12.87a40.06 40.06 0 0 0-3.79-4.89l7.99-7.98zm-4.2-23.23c2.7 5 4.2 10.47 4.5 16l-9.67-9.67c1.97-1.97 3.7-4.1 5.17-6.33zm-14.86-.54l6.83 6.84a37.85 37.85 0 0 1-23.36 9.7l9.66-9.67 1.41-1.41 5.46-5.46zm-8.25 5.43l-7.99 7.98c.61-4.45 2.01-8.82 4.2-12.87a40.04 40.04 0 0 0 3.79 4.89zm1.41-1.42A37.99 37.99 0 0 1 7.68 20a38 38 0 0 1 4.07-5.42L17.17 20l-5.42 5.42zm-5.2-7.37a40.04 40.04 0 0 1 3.79-4.89L2.35 5.18c.61 4.45 2.01 8.82 4.2 12.87zm6.58-4.92l-1.41-1.41-9.66-9.66a37.85 37.85 0 0 1 23.36 9.7l-6.83 6.83-5.46-5.46zm13.74 13.74L20 20l6.87-6.87A38.1 38.1 0 0 1 32.32 20a38.1 38.1 0 0 1-5.45 6.87zm6.58-8.82a40.18 40.18 0 0 0-5.17-6.33l9.66-9.66c-.3 5.52-1.8 11-4.49 16z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");`,
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
          boxShadow: { xs: 0, sm: 0, md: 0, lg: 10 },
        }}
        direction={{ xs: "row", sm: "row", md: "row", lg: "column" }}
        textAlign="center"
      >
        <Grid
          item
          xs={3}
          sm={3}
          md={3}
          lg={4}
          container
          alignItems="center"
          justifyContent="center"
        >
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
