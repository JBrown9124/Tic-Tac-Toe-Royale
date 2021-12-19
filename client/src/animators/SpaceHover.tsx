import { animated, useSpring, useTransition } from "react-spring";
import { useRef, useState, useEffect } from "react";

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
    }, 12000);
    return () => {
      clearInterval(t);
    };
  }, []);
  const style = useSpring({
    opacity: isVisible ? 1 : 0,
    width: width,
    display: "inline-block",
    backfaceVisibility: "hidden",
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
      : 	{ mass: 1, tension: 280, friction: 60 },
  });

  const trigger = () => {
    setIsBooped(true);
  };
  const triggerLeave = () => {
    setIsBooped(false);
  };
  return (
    <animated.div
      onMouseEnter={trigger}
      onMouseLeave={triggerLeave}
      style={style as any}
    >
      {children}
    </animated.div>
  );
};

export default TileHover;
