import { useSpring } from "react-spring";
import { useTransition, animated, config } from "react-spring";

import { Player } from "../Models/Player";
import { GameStatus } from "../Models/GameStatus";
import useSound from "use-sound";
import Typography from "@mui/material/Typography";
import React, { useEffect, useRef, useState } from "react";
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
  playerId: string;
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
  playerId,
}: PlayerTurnOrderAnimatorProps) {
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
  const playerPiecesEndRef = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    playerPiecesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [playerPieces]);
  return (
    <>
      {transitions((style, item, t, i) => (
        <animated.div
          style={{
            ...style,
        
            padding:
              item.playerId === playerPieces[playerPieces.length - 1].playerId
                ? "20px"
                : "6px",
            scale:
              item.playerId === playerPieces[playerPieces.length - 1].playerId
                ? 1.3
                : 1,
          }}
          ref={playerPiecesEndRef}
        >
          <Grid item>{item.piece}</Grid>
          <Grid
            item
            sx={{
              color:
                item.playerId === playerPieces[playerPieces.length - 1].playerId
                  ? "green"
                  : item.playerId ===
                    playerPieces[playerPieces.length - 2].playerId
                  ? "yellow"
                  : "black",
            }}
          >
            {" "}
            {playerId === playerPieces[playerPieces.length - 1].playerId &&
            item.playerId === playerPieces[playerPieces.length - 1].playerId
              ? "You're Up!"
              : playerId === playerPieces[playerPieces.length - 2].playerId &&
                item.playerId === playerPieces[playerPieces.length - 2].playerId
              ? "You're Next!"
              : item.name}
          </Grid>
        </animated.div>
      ))}
    </>
  );
}
