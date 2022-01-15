import Grid from "@mui/material/Grid";
import PlayerTurnOrderAnimator from "../../../animators/PlayerTurnOrderAnimator";
import { Player } from "../../../Models/Player";
import { GameStatus } from "../../../Models/GameStatus";
import { RgbaColor } from "react-colorful";

import { useEffect } from "react";
interface TurnOrderProps {
  playerPieces: Player[];
  setPlayerPieces: (playerPieces: Player[]) => void;
  isBoardCreated: boolean;
  whoTurn: string;
  isCountDownFinished: boolean;

  gameStatus: GameStatus;
  playerId: string;
}
export default function TurnOrder({
  playerPieces,
  setPlayerPieces,
  isBoardCreated,
  whoTurn,
  isCountDownFinished,

  gameStatus,
  playerId,
}: TurnOrderProps) {
  return (
    <>
      <Grid
        container
        textAlign="center"
        direction={{ sm: "column", md: "column" }}
        justifyContent={{ sm: "", md: "normal" }}
        sx={{
          borderRadius: "15px",
          overflowY: "auto",
          overflowX: "hidden",
          bgcolor: "#b4cad1",
          p: 1,
          boxShadow: 10,

          maxHeight: { xs: 150, md: 250, lg: 700 },
        }}
      >
        <Grid
          item
          sx={{
            overflowY: { xs: "hidden", sm: "auto", md: "auto", lg: "auto" },
            overflowX: "hidden",
          }}
        >
          {/* {playerPieces.map((item, i) => (
            <>
              <Grid item>{playerPieces[i].piece}</Grid>
              <Grid
             
                item
                sx={{
                  color:
                  playerPieces[i].playerId ===
                    playerPieces[playerPieces.length - 1]?.playerId
                      ? "green"
                      : item?.playerId ===
                        playerPieces[playerPieces.length - 2]?.playerId
                      ? "yellow"
                      : "black",
                }}
              >
                {" "}
                {playerId === playerPieces[playerPieces.length - 1]?.playerId &&
               playerPieces[i].playerId ===
                  playerPieces[playerPieces.length - 1]?.playerId
                  ? "You're Up!"
                  : playerId ===
                      playerPieces[playerPieces.length - 2]?.playerId &&
                      playerPieces[i].playerId ===
                      playerPieces[playerPieces.length - 2]?.playerId
                  ? "You're Next!"
                  : playerPieces[i].name}
              </Grid>
            </>
          ))} */}

          <PlayerTurnOrderAnimator
            playerId={playerId}
            gameStatus={gameStatus}
            isCountDownFinished={isCountDownFinished}
            isBoardCreated={isBoardCreated}
            setPlayerPieces={(props) => {
              setPlayerPieces(props);
            }}
            playerPieces={playerPieces}
            whoTurn={gameStatus.whoTurn}
          />
        </Grid>
      </Grid>
    </>
  );
}
