import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import { useCookies } from "react-cookie";
import { useSound } from "use-sound";
const Input = styled(MuiInput)`
  width: 42px;
`;
interface SizeSliderProps {
  setSize: (size: number) => void;
  size: number;
}
export default function SizeSlider({ setSize, size }: SizeSliderProps) {
  const [playSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/snareForwardButton.mp3"
  );
  const handleSliderChange = (value: number | number[]) => {
    if (typeof value === "number") {
      setSize(value);
    }
  };

  const handleInputChange = (value: number) => {
    setSize(value);
    playSound();
  };

  const handleBlur = () => {
    if (size < 0) {
      setSize(0);
    } else if (size > 20) {
      setSize(20);
    }
  };

  
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography>Select Board Size</Typography>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={10}>
          <Slider
            max={20}
            step={1}
            min={3}
            value={size}
            onChange={(
              e: Event,
              value: number | number[],
              activeThumb: number
            ) => {
              handleSliderChange(value);
            }}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Input
            value={size}
            size="small"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(parseInt(e.target.value));
            }}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 3,
              max: 20,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
