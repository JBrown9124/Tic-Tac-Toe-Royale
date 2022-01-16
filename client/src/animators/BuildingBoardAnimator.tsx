import React, {
    useState,
    useCallback,
    useRef,
    useEffect,
    ReactNode,
  } from "react";
  import { useTransition, animated, config } from "react-spring";
  import Typography from "@mui/material/Typography";

  import Grid from "@mui/material/Grid";
  
  export default function Analyzing() {
    const [index, setIndex] = useState(0);
    const slides = [".", ".", "."];
  
    const transitions = useTransition(index, {
      key: index,
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
    });
  
    useEffect(() => {
      if (index >= slides.length - 1) {
        const t = setInterval(() => {
          setIndex(0);
        }, 1000);
        return () => {
          clearInterval(t);
        };
      } else {
        const t = setInterval(() => {
          setIndex((state) => state + 1);
        }, 500);
        return () => {
          clearInterval(t);
        };
      }
    }, [index]);
  
    return (
      <>
        <Grid
         
          spacing={0}
          container
        >
          <Grid item>
            <Typography variant="h1">Creating your board</Typography>
          </Grid>
          {transitions((style, item: any) => (
            <Grid item>
              <animated.div
                style={{
                  ...style,
                }}
              >
                <Typography variant="h1">{slides[index]}</Typography>
              </animated.div>
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
  