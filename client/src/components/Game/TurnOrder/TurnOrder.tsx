import Grid from "@mui/material/Grid";
import PlayerTurnOrderAnimator from "../../../animators/PlayerTurnOrderAnimator";
import { Player } from "../../../Models/Player";
import { GameStatus } from "../../../Models/GameStatus";
import { useEffect } from "react";
interface TurnOrderProps {
  playerPieces: Player[];
  setPlayerPieces: (playerPieces: Player[]) => void;
  isBoardCreated: boolean;
  whoTurn: number;
  isCountDownFinished: boolean;
  turnNumber: number;
  gameStatus: GameStatus;
  playerId:string
}
export default function TurnOrder({
  playerPieces,
  setPlayerPieces,
  isBoardCreated,
  whoTurn,
  isCountDownFinished,
  turnNumber,
  gameStatus,
  playerId
}: TurnOrderProps) {
  useEffect(() => {
    window.scrollTo(700, 700);
  }, []);
  return (
    <>
      <Grid
        textAlign="center"
        direction={{ sm: "row", md: "column" }}
        justifyContent={{ sm: "center", md: "normal" }}
        sx={{
          borderRadius: "15px",

          bgcolor: "#dedfe8",
          p: 1,
          boxShadow: 10,
          overflowY: "auto",
          overflowX: "hidden",
          maxHeight: { xs: 150, md: 700 },
        }}
      >
        <PlayerTurnOrderAnimator
        playerId={playerId}
          gameStatus={gameStatus}
          turnNumber={turnNumber}
          isCountDownFinished={isCountDownFinished}
          isBoardCreated={isBoardCreated}
          setPlayerPieces={(props) => {
            setPlayerPieces(props);
          }}
          playerPieces={playerPieces}
          whoTurn={gameStatus.whoTurn}
        />
      </Grid>
    </>
  );
}
