import { animated, useSpring } from "react-spring";
import React, { useEffect, useState } from "react";
interface StatusBoardInProps{
    isVisible?:boolean,
    delay?:number,
    x?:number,
    y?:number,
    fromY?:number,
    fromX?:number,
    rotation?:number,
    scale?:number,
    fromScale?:number,
    children:React.ReactNode,
}
export default function StatusBoardAnimator({
  isVisible = false,
  delay = 0,
  x = 0,
  y = 0,
  fromY = 0,
  fromX = 0,
  rotation = 0,
  scale = 1.0,
  fromScale = 1,
  children,
}:StatusBoardInProps) {
  const [fade, setFade] = useState(false);
  useEffect(()=>{
    if (isVisible){
    setFade(isVisible)


  }}, [isVisible])
  const props = useSpring({
    from: {
      transform: `translate(${fromX}px, ${fromY}px)
      rotate(0deg)
      
      scale(${fromScale})`,
      opacity: 0,
    },

    
      transform: fade ? `translate(${x}px, ${y}px)
         rotate(${rotation}deg)
         scale(${scale})`: `translate(${fromX}px, ${fromY}px)
         rotate(0deg)
         
         scale(${fromScale})`,
      opacity: fade ? 1:0,
    
   
    delay: delay,

    //   opacity: 0,

    // },

    config: { mass: 1, tension: 170, friction: 26 },
    //   onRest: () => set(!flip),
  });

  return <animated.div style={props}>{children}</animated.div>;
}


