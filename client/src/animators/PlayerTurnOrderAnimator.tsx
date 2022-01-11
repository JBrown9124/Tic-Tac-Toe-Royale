import { useSpring } from "react-spring";
import { useTransition, animated, config } from "react-spring";
import { useState, useEffect, ReactNode } from "react";
import { Player } from "../Models/Player";
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

 

  const transitions = useTransition(
    playerPieces.map((playerPiece, idx) => ({ ...playerPiece, idx })),
    {
      key: (piece: any) => piece.idx,
      from: { scale: 1 },
      enter: { scale: 1 },
      leave: { scale: 1 },

     
    }
  );

  return (
    <>
      {transitions((style, item, t, i) => (
        <animated.div
          style={{
            ...style,
            padding: "10px",
          }}
        >
          <Grid>{item.piece}</Grid>
          <Grid>{item.name}</Grid>

          {/* {signedInSlides[3]} */}
        </animated.div>
      ))}
    </>
  );
}
