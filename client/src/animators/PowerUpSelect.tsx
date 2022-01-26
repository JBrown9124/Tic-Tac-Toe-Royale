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
  isClicked:boolean
 
}
const PowerUpSelect = ({
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
 isClicked
}: Props) => {
  const [isBooped, setIsBooped] = useState(false);
 

 

  const style = useSpring({
    
 opacity:1,


    transform:  isClicked
    ? `translate(${x}px, ${y}px)
    rotate(${rotation}deg)
    scale(${scale})`
 : `translate(0px, 0px)
    rotate(0deg)
    
    scale(1)`,
    
    config: isClicked
      ? { mass: 0.1, tension: 399, friction: 0, clamp: true }
      : { mass: 1, tension: 170, friction: 26 },
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

export default PowerUpSelect;
