import { useSpring } from "react-spring";
import { useTransition, animated, config } from "react-spring";
import { useState, useEffect, ReactNode } from "react";
import { Player } from "../Models/Player";
import { GameStatus } from "../Models/GameStatus";
import useSound from "use-sound";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
interface PlayerTurnOrderAnimatorProps {
  delay?: number;
  x?: number;
  y?: number;
  fromY?: number;
  fromX?: number;
  rotation?: number;
  scale?: number;
  fromScale?: number;
  children?: React.ReactNode;
  playerPieces: Player[];
  setPlayerPieces: (playerPieces: Player[]) => void;
  isBoardCreated: boolean;
  whoTurn: number;
  isCountDownFinished: boolean;
  turnNumber: number;
  gameStatus: GameStatus;
}
export default function PlayerTurnOrderAnimator({
  delay = 0,
  x = 0,
  y = 0,
  fromY = 0,
  fromX = 0,
  rotation = 0,
  scale = 1.0,
  fromScale = 1,
  children,
  playerPieces,
  setPlayerPieces,
  isBoardCreated,
  whoTurn,
  isCountDownFinished,
  turnNumber,
  gameStatus,
}: PlayerTurnOrderAnimatorProps) {
  const [fade, setFade] = useState(false);
  const [turnOrderPlayerPieces, setTurnOrderPlayerPieces] =
    useState(playerPieces);
  const [index, setIndex] = useState(0);
  const [numbers, setNumbers] = useState(["", 3, 2, 1, "Begin", ""]);
  const [startCountDownSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/countDown.mp3"
  );
  const [startOpenSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/warHorn.mp3"
  );

  let height = 0;
  const transitions = useTransition(
    playerPieces.map((playerPiece, idx) => ({ ...playerPiece, idx })),
    {
      key: (piece: any) => piece.idx,
      from: { scale: 0 },
      enter: { scale: 1 },
      leave: { scale: 0 },
    }
  );

  return (
    <>
      {transitions((style, item, t, i) => (
        <animated.div
          style={{
            ...style, padding:"6px"
          }}
        >
          
          <Grid item >{item.piece}</Grid>
          <Grid item >
            {
              item.name}
          </Grid>
        
          {/* <Grid container direction="column">
            <Grid item sx={{ p: 1 }}>
              {gameStatus.win.whoWon === "tie" ? (
                <Typography variant="h6">Its a tie!</Typography>
              ) : (
                item.playerId ===
                  playerPieces[playerPieces.length - 1].playerId && (
                  <Typography variant="h6">
                    {playerPieces.map((player: Player) => {
                      if (player.turnNumber === gameStatus.whoTurn) {
                        if (player.turnNumber === turnNumber) {
                          return "Your Turn";
                        }
                        return `${player.name}'s Turn`;
                      }
                    })}
                  </Typography>
                )
              )}
            </Grid>
          </Grid> */}

          {/* {signedInSlides[3]} */}
        </animated.div>
      ))}
    </>
  );
}
