import { useSpring } from "react-spring";
import { useTransition, animated, config } from "react-spring";
import { useState, useEffect, ReactNode } from "react";
import useSound from "use-sound";
import Typography from "@mui/material/Typography";
interface CountDownAnimatorProps {

  delay?: number;
  x?: number;
  y?: number;
  fromY?: number;
  fromX?: number;
  rotation?: number;
  scale?: number;
  fromScale?: number;
  children?: React.ReactNode;
  startCountDown: boolean;
  setBotCanMove: (canMove: boolean) => void;
  setIsCountDownFinished: (isFinished: boolean) => void;
}
export default function CountDownAnimator({

  delay = 0,
  x = 0,
  y = 0,
  fromY = 0,
  fromX = 0,
  rotation = 0,
  scale = 1.0,
  fromScale = 1,
  children,
  startCountDown,
  setBotCanMove,
  setIsCountDownFinished,
}: CountDownAnimatorProps) {
  const [fade, setFade] = useState(false);

  const [index, setIndex] = useState(0);
  const [numbers, setNumbers] = useState(["",5, 4, 3, 2, 1, "Begin", ""]);
  const [startCountDownSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/countDown.mp3"
  );
  const [startOpenSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/warHorn.mp3"
  );

  useEffect(() => {
    if (startCountDown) {
      if (index < 6) {
        const t = setTimeout(() => {
          startCountDownSound();
          setIndex((state) => state + 1);
        }, 2000);
        return () => {
          clearTimeout(t);
        };
      } else if (index === 6) {
        const t = setTimeout(() => {
          setIndex((state) => state + 1);
          setIsCountDownFinished(true);
          startOpenSound();
        }, 2000);
        return () => {
          clearTimeout(t);
        };
      } else if (index === 7) {
        setTimeout(() => setBotCanMove(true), 5000);
      }
    }
  }, [startCountDown, index]);

 
  const transitions = useTransition(index, {
    key: index,
    from: { scale: 0 },
    enter: { scale: 2 },
    leave: { scale: 0 },

    config: { tension: 280, friction: 80 },
    trail: 1500,
  });

  return (
    <>
      {transitions((style, i) => (
        <animated.div
          style={{
            ...style,
            textAlign: "center",
            position: "absolute",
            
            justifyContent: "center",
            width: "100%",
            left: "0px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              // position: "absolute",
              // top: "50%",
              // left: "50%",
              // transform: `translate(-50%, -50%)`,
             
              fontSize: "6rem",
            }}
          >
            {numbers[i]}
          </Typography>

          {/* {signedInSlides[3]} */}
        </animated.div>
      ))}
    </>
  );
}



