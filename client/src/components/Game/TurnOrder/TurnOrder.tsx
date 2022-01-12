import Grid from "@mui/material/Grid";
import PlayerTurnOrderAnimator from "../../../animators/PlayerTurnOrderAnimator";
import { Player } from "../../../Models/Player";
import { GameStatus } from "../../../Models/GameStatus";
import { RgbaColor } from "react-colorful";
import { Scrollbars } from "react-custom-scrollbars";
import { useEffect } from "react";
interface TurnOrderProps {
  playerPieces: Player[];
  setPlayerPieces: (playerPieces: Player[]) => void;
  isBoardCreated: boolean;
  whoTurn: number;
  isCountDownFinished: boolean;
  turnNumber: number;
  gameStatus: GameStatus;
  playerId: string;
}
export default function TurnOrder({
  playerPieces,
  setPlayerPieces,
  isBoardCreated,
  whoTurn,
  isCountDownFinished,
  turnNumber,
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
          overflowY:"auto",
          overflowX: "hidden",
          bgcolor: "#b4cad1",
          p: 1,
          boxShadow: 10,

          maxHeight: { xs: 150, md: 700 },
        }}
      >
        <Grid item sx={{ overflowY: {xs:"hidden",md:"auto"}, overflowX: "hidden" }}>
          {/* <Scrollbars
          renderTrackHorizontal={(props) => (
            <div
              {...props}
              style={{ display: "none", }}
              className="track-horizontal"
            />
          )}
          autoHeight
          style={{height:"auto", width:"auto"}}
          autoHeightMax={650}
          autoHeightMin={0}
        > */}
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
        {/* </Scrollbars> */}
      </Grid>
    </>
  );
}
