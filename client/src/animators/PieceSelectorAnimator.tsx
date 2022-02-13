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
  delay?: number;
  isSelected: boolean;
  quantity?: number;
}
const PieceSelectorAnimator = ({
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
  isSelected,
  quantity,
}: Props) => {
  const [isBooped, setIsBooped] = useState(false);
  const [isQuantityChanged, setIsQuantityChanged] = useState(false);
  const style = useSpring({
    opacity: 1,
    height: "90%",
    borderRadius: "5px",
    // boxShadow: isSelected
    //   ? "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
    //   : "rgba(0, 0, 0, 0.0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.00) 0px 0px 0px inset",
    transform: isSelected
      ? `translate(${x}px, ${y}px)
    rotate(${rotation}deg)
    scale(${scale})`
      : `translate(0px, 0px)
    rotate(0deg)
    
    scale(1)`,

    config: { mass: 1, tension: 170, friction: 26 },
  });

  const hover = useSpring({
    opacity: 1,

    transform: isSelected
      ? `translate(${x}px, ${y}px)
    rotate(${rotation}deg)
    scale(${1.2})`
      : `translate(0px, 0px)
    rotate(0deg)
    
    scale(1)`,

    config: { mass: 1, tension: 170, friction: 26 },
  });
  //   useEffect(() => {
  //     if (quantity > 1) {
  //       setIsQuantityChanged(true);
  //       const t = setTimeout(() => {
  //         setIsQuantityChanged(false);
  //       }, 200);
  //       return () => {
  //         clearTimeout(t);
  //       };
  //     }
  //   }, [quantity]);


  return (
 
      <animated.div
        style={hover as any}
     
      >
        {children}
      </animated.div>

  );
};

export default PieceSelectorAnimator;
