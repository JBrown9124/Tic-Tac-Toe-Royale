import Grid from "@mui/material/Grid";
import PlayerTurnOrderAnimator from "../../../animators/PlayerTurnOrderAnimator";
import { Player } from "../../../Models/Player";
import { GameStatus } from "../../../Models/GameStatus";
import { statusBoardTurnOrderBackgroundColor } from "../../../themes/theme1";

interface TurnOrderProps {
  playerPieces: Player[];
  setPlayerPieces: (playerPieces: Player[]) => void;
  isBoardCreated: boolean;
  whoTurn: string;
  isCountDownFinished: boolean;
  playerWhoLeftSessionId: string;
  gameStatus: GameStatus;
  playerId: string;
}
export default function TurnOrder({
  playerPieces,
  setPlayerPieces,
  isBoardCreated,
  whoTurn,
  isCountDownFinished,
  playerWhoLeftSessionId,
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
          bgcolor: statusBoardTurnOrderBackgroundColor,
          p: 1,
          boxShadow: 10,
          border: "solid black 1px",
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
          <PlayerTurnOrderAnimator
            playerWhoLeftSessionId={playerWhoLeftSessionId}
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
