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
  isClicked: boolean;
  quantity: number;
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
  isClicked,
  quantity,
}: Props) => {
  const [isBooped, setIsBooped] = useState(false);
  const [isQuantityChanged, setIsQuantityChanged] = useState(false);
  const style = useSpring({
    opacity: 1,

    transform: isClicked
      ? `translate(${x}px, ${y}px)
    rotate(${rotation}deg)
    scale(${scale})`
      : `translate(0px, 0px)
    rotate(0deg)
    
    scale(1)`,

    config: { mass: 1, tension: 170, friction: 26 },
  });
  const quantityChanged = useSpring({
    opacity: 1,

    transform: isQuantityChanged
      ? `translate(${x}px, ${y}px)
    rotate(${rotation}deg)
    scale(${scale})`
      : `translate(0px, 0px)
    rotate(0deg)
    
    scale(1)`,

    config: { mass: 1, tension: 180, friction: 12 },
  });
  const hover = useSpring({
    opacity: 1,

    transform: isBooped
      ? `translate(${x}px, ${y}px)
    rotate(${rotation}deg)
    scale(${1.2})`
      : `translate(0px, 0px)
    rotate(0deg)
    
    scale(1)`,

    config: { mass: 1, tension: 170, friction: 26 },
  });
  useEffect(() => {
    if (quantity > 1) {
      setIsQuantityChanged(true);
      const t = setTimeout(() => {
        setIsQuantityChanged(false);
      }, 200);
      return () => {
        clearTimeout(t);
      };
    }
  }, [quantity]);
  const trigger = () => {
    setIsBooped(true);
  };
  const triggerLeave = () => {
    setIsBooped(false);
  };

  return (
    <animated.div style={style as any}>
      <animated.div style={quantityChanged as any}>
        <animated.div  style={hover as any} onMouseEnter={trigger} onMouseLeave={triggerLeave}>
          {children}
        </animated.div>
      </animated.div>
    </animated.div>
  );
};

export default PowerUpSelect;
