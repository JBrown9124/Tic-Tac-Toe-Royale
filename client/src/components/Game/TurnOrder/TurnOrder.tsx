import Grid from "@mui/material/Grid";
import PlayerTurnOrderAnimator from "../../../animators/PlayerTurnOrderAnimator";
import { Player } from "../../../Models/Player";
import { GameStatus } from "../../../Models/GameStatus";
import { statusBoardTurnOrderBackgroundColor } from "../../../themes/theme1";
import { useRef, useEffect } from "react";

interface TurnOrderProps {
  playerPieces: Player[];
  setPlayerPieces: (playerPieces: Player[]) => void;
  isBoardCreated: boolean;
  whoTurn: string;
  isCountDownFinished: boolean;
  playerWhoLeftSessionId: string;
  gameStatus: GameStatus;
  playerId: string;
  sizeOfBoardPiece: { desktop: string; mobile: string };
  boardSize: number;
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
  sizeOfBoardPiece,
  boardSize,
}: TurnOrderProps) {
  const playerPiecesEndRef = useRef<null | HTMLDivElement>(null);
  const playersTurn = playerId === whoTurn
  const scrollToBottom = () => {
    playerPiecesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };
  useEffect(() => {
    
    scrollToBottom();
  }, [playerPieces]);
  return (
    <>
      <Grid
        container
        alignItems="center" 
        sx={{
          borderRadius: "15px",
          overflowY: { xs: "auto", sm: "auto", md: "auto", lg: "auto" },
          overflowX: { xs: "auto", sm: "auto", md: "auto", lg: "hidden" },
          bgcolor: statusBoardTurnOrderBackgroundColor,
          p: 1,
          boxShadow: 10,

          border: "solid #ec407a 1px",
          // height: sizeOfBoardPiece && 748,
          height: { xs: 100, sm: 100, md: 100, lg: 855 },
          width: { lg: 150 },

          // boardSize === 6
          //   ? 762
          //   : boardSize === 5
          //   ? 554.4
          //   : boardSize === 4
          //   ? 457.5
          //   : boardSize === 3
          //   ? 359.5
          //   : 748,

          // maxHeight: { xs: 150, md: 250, lg: 750 },
        }}
      >
        {/* <Grid
          item
          sx={{
            overflowY: { xs: "hidden", sm: "auto", md: "auto", lg: "hidden" },
            overflowX: "hidden",
          }}
        > */}
        <Grid
          container
          
          direction={{ xs: "row", sm: "row", md: "row", lg: "column" }}
        >
          {playerPieces.map((player) => (
            <Grid
              container
              direction={{
                xs: "column",
                sm: "column",
                md: "column",
                lg: "column",
              }}
              sx={{ p: 2 }}
              item
              xs={3}
              sm={3}
              md={3}
              textAlign="center"
              justifyContent="center"
              alignItems="center"
              ref={playerPiecesEndRef}
              key={player.playerId}
          
            >
              <Grid item>{player.piece}</Grid>
              <Grid
                item
                sx={{
                  color:
                    player.playerId ===
                    playerPieces[playerPieces.length - 1]?.playerId
                      ? "black"
                      : "black",
                  fontFamily: "Cinzel, serif",
                  fontStyle:
                    player.playerId === gameStatus.win.whoWon
                      ? "italic"
                      : "normal",
                }}
              >
                {" "}
                {playerId === playerPieces[playerPieces.length - 1]?.playerId &&
                player?.playerId ===
                  playerPieces[playerPieces.length - 1]?.playerId
                  ? "You're Up!"
                  : playerId ===
                      playerPieces[playerPieces.length - 2]?.playerId &&
                    player?.playerId ===
                      playerPieces[playerPieces.length - 2]?.playerId
                  ? "You're Next!"
                  : gameStatus.win.whoWon === playerId &&
                    player.playerId === playerId
                  ? "You Win!"
                  : player.playerId === gameStatus.win.whoWon
                  ? `${player.name} Wins!`
                  : player?.name}
              </Grid>
            </Grid>
          ))}
         
        </Grid>
        {/* <PlayerTurnOrderAnimator
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
          /> */}
      </Grid>
      {/* </Grid> */}
    </>
  );
}
