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
  isUsingPowerUp: boolean;
  fromScale?:number
}
const PreGameModalAnimator = ({
  x = 0,
  y = 0,
  rotation = 0,
  scale = 1.0,
  fromY = 0,
  fromX = 0,
  fromScale=1,
  beforeColor,
  afterColor,
  width,
  delay,
  children,
  isUsingPowerUp,
}: Props) => {
  const [isBooped, setIsBooped] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      setIsBooped(true);
    },200);
    return () => {
      clearTimeout(t);
    };
  }, []);
  const style = useSpring({
    opacity: isBooped?1:0,
    transform: isBooped
      ? `translate(${x}px, ${y}px)
    rotate(${rotation}deg)
    scale(${scale})`
      : `translate(${fromX}px, ${fromY}px)
    rotate(0deg)
    
    scale(${fromScale})`,

    config: { mass: 1, tension: 180, friction: 12 }
    ,
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
        
      {children}
    </animated.div>
  );
};

export default PreGameModalAnimator;
