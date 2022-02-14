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
interface TurnStatusProps {
  playerPieces: Player[];
  gameStatus: GameStatus;
  playerId: string;
}
export default function TurnStatus({
  playerPieces,
  gameStatus,
  playerId,
}: TurnStatusProps) {
  return (
    <>
      <Grid
        container
        direction="column"
        sx={{ }}
        
      >
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

       
      </Grid>
    </>
  );
}
