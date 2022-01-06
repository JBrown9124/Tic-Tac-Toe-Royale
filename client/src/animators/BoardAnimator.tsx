import { animated, useSpring, useTransition } from "react-spring";
import { useRef, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { RgbaColor } from "react-colorful";
import { clear } from "console";
import { Win } from "../Models/Win";
interface Props {
  x?: number | string;
  y?: number | string;
  rotation?: number;
  scale?: number;
  children: React.ReactNode;
  fromY?: number;
  fromX?: number;
  beforeColor: RgbaColor;
  afterColor?: RgbaColor;
  width?: string;
  delay: number;
  boardRenderTime: number;
  win: Win;
  move: { rowIdx: number; tileIdx: number };
  isBoardCreated: boolean;
}
const BoardAnimator= ({
  x = 0,
  y = 0,
  rotation = 0,
  scale = 1.0,
  fromY = 0,
  fromX = 0,
  beforeColor,
  afterColor,
  width,
  delay,
  children,
  boardRenderTime,
  win,
  move,
  isBoardCreated,
}: Props) => {
  const [isBooped, setIsBooped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isWinningMove, setIsWinningMove] = useState(false);

  const [lineDirection, setLineDirection] = useState<string>(
    win.type === null ? "None" : win.type === "tie" ? "horizontal" : win.type
  );
  const [config, setConfig] = useState({
    mass: 1,
    tension: 280,
    friction: 120,
    clamp: false,
  });
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isBoardCreated) {
      setIsVisible(true);
      const t = setTimeout(() => {
        setIsRendered(true);
      }, boardRenderTime);
      return () => {
        clearTimeout(t);
      };
    }
  }, [isBoardCreated]);
  useEffect(() => {
    setLineDirection(
      win?.type === null
        ? "None"
        : win.type === "tie"
        ? "horizontal"
        : win.type
    );
  }, [win?.type]);
  useEffect(() => {
    setLineDirection(
      win?.type === null
        ? "None"
        : win.type === "tie"
        ? "horizontal"
        : win.type
    );

    const determineWinningMove = () => {
      return win?.winningMoves?.map((winningMove) => {
        if (
          winningMove.rowIdx === move.rowIdx &&
          winningMove.tileIdx === move.tileIdx
        ) {
          setIsWinningMove(true);
        }
      });
    };
    if (win?.type === "tie") {
      setIsWinningMove(true);
    } else {
      determineWinningMove();
    }
  }, [lineDirection]);
  const style = useSpring({
    opacity: isVisible ? 1 : 0,
    width: width,

    delay: isRendered ? 0 : delay,
    transform: isVisible
      ? `translate(${x}px, ${y}px)
         rotate(${0}deg)
         scale(${scale})`
      : `translate(-300px, 0px)
         rotate(180deg)
         
         scale(5)`,
    background: isBooped
      ? `rgba(${beforeColor.r}, ${beforeColor.g}, ${beforeColor.b}, ${
          beforeColor.a - 0.5
        })`
      : `rgba(${beforeColor.r}, ${beforeColor.g}, ${beforeColor.b}, ${beforeColor.a})`,
    config: isRendered
      ? { mass: 0.1, tension: 399, friction: 0, clamp: true }
      : { mass: 1, tension: 170, friction: 26 },
  });
  const directionProps: any = {
    vertical: {
      height: isWinningMove ? "100%" : "0%",
      width: "4px",
      top: "0%",
      left: "50%",
      delay: move.rowIdx,
      rotate: 0,
    },
    horizontal: {
      height: "4px",
      width: isWinningMove ? "100%" : "0%",
      top: "50%",
      left: "0%",
      delay: move.tileIdx,
      rotate: 0,
    },
    diagonalRight: {
      rotate: 45,
      height: "4px",
      width: isWinningMove ? "150%" : "0%",
      top: "40%",
      left: "-25%",
      delay: move.rowIdx,

      opacity: isWinningMove ? 1 : 0,
    },
    diagonalLeft: {
      height: "4px",
      width: isWinningMove ? "150%" : "0%",
      top: "40%",
      left: "-20%",
      delay: move.rowIdx,
      rotate: -45,
      opacity: isWinningMove ? 1 : 0,
    },
  };
  const lineStyle = useSpring({
    height: directionProps[lineDirection]?.height,
    width: directionProps[lineDirection]?.width,
    opacity: directionProps[lineDirection]?.opacity,

    background:
      beforeColor.r * 0.299 + beforeColor.g * 0.587 + beforeColor.b * 0.114 >
      186
        ? "white"
        : "black",
    zIndex: 9999,

    delay: delay / 2,
    config: {
      mass: 1,
      tension: 170,
      friction: 26,
    },
  });
  const trigger = () => {
    setIsBooped(true);
  };
  const triggerLeave = () => {
    setIsBooped(false);
  };

  return (
    <Grid sx={{ position: "relative", display: "inline-block" }}>
      <animated.div
        style={{
          ...(lineStyle as any),
          transform: `translate(${0}px, ${0}px)
         rotate(${directionProps[lineDirection]?.rotate}deg)
         scale(${1})`,
          position: "absolute",
          top: directionProps[lineDirection]?.top,
          left: directionProps[lineDirection]?.left,
        }}
      />
      <animated.div
        onMouseEnter={trigger}
        onMouseLeave={triggerLeave}
        style={style as any}
      >
        {children}
      </animated.div>
    </Grid>
  );
};

export default BoardAnimator;
