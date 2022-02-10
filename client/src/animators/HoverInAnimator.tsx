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
  beforeColor?: RgbaColor;
  afterColor?: RgbaColor;
  width?: string;
  delay: number;
  selectedPiece: string;
  isPieceSelected: boolean;
  fromScale?: number;
  onHoverPiece: string;
  isOnHoverPiece: boolean;
  hoverDirection: string;
}
const HoverInAnimator = ({
  x = 0,
  y = 0,
  rotation = 0,
  scale = 1.0,
  fromY = 0,
  fromX = 0,
  fromScale = 1,
  beforeColor,
  afterColor,
  width,
  delay,
  children,
  selectedPiece,
  isPieceSelected,
  onHoverPiece,
  isOnHoverPiece,
  hoverDirection,
}: Props) => {
  const [isBooped, setIsBooped] = useState(false);
  const [isHover, setIsHover] = useState(false);
  useEffect(() => {
    setIsBooped(true);
    const t = setTimeout(() => {
      setIsBooped(false);
    }, 200);
    return () => {
      clearTimeout(t);
    };
  }, [selectedPiece]);
  useEffect(() => {
    if (isOnHoverPiece) {
      setIsHover(false);
    } else {
      setIsHover(true);
    }
  }, [isOnHoverPiece]);
  const style = useSpring({
    transform: isBooped
      ? `translate(${x}px, ${y}px)
    rotate(${rotation}deg)
    scale(${1.2})`
      : `translate(${fromX}px, ${fromY}px)
    rotate(0deg)
    
    scale(${1})`,

    config: { mass: 1, tension: 170, friction: 26 },
  });
  const hover = useSpring({
    opacity: isOnHoverPiece ? 0 : 1,
    transform: isOnHoverPiece
      ? `translate(${hoverDirection === "right" ? -35 : 35}px, ${y}px)
    rotate(${rotation}deg)
    scale(${1})`
      : `translate(${0}px, ${fromY}px)
    rotate(0deg)
    
    scale(${1})`,

    config: { mass: 1, tension: 170, friction: 26 },
  });
  const trigger = () => {
    setIsBooped(true);
  };
  const triggerLeave = () => {
    setIsBooped(false);
  };

  return (
    <animated.div
      // onMouseEnter={trigger}
      // onMouseLeave={triggerLeave}
      style={style as any}
    >
      <animated.div style={hover as any}>{children}</animated.div>
    </animated.div>
  );
};

export default HoverInAnimator;
