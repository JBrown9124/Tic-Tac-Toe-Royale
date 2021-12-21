import { animated, useSpring, useTransition } from "react-spring";
import { useRef, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { RgbaColor } from "react-colorful";
import { clear } from "console";
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
  boardRenderTime:number;
  isWin:boolean
}
const TileHover = ({
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
  isWin
}: Props) => {
  const [isBooped, setIsBooped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [config, setConfig] = useState({
    mass: 1,
    tension: 280,
    friction: 120,
    clamp: false,
  });
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const t = setInterval(() => {
      setIsRendered(true);
    },  boardRenderTime);
    return () => {
      clearInterval(t);
    };
  }, []);
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
      : 		{ mass: 1, tension: 170, friction: 26 },
  });
  const lineStyle = useSpring({
    
    position: "absolute",
    top: "50%",
    left: 0,
    width: isWin ? "100%" : "0%",
    height: `2px`,
    background: "black",
    zIndex:9999,
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
    <Grid  sx={{ position: "relative", display: "inline-block" }}>
      <animated.div style={lineStyle as any}/>
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

export default TileHover;
