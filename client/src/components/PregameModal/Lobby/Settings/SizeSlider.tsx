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

export default function SizeSlider() {
  const [size, setSize] = useState<number | string | Array<number | string>>(3);
  const [sessionCookie, setSessionCookie] = useCookies();
  const [playSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/snareForwardButton.mp3"
  );
  const handleSliderChange = (event: Event, value: number | number[]) => {
    setSize(value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value === "" ? "" : Number(event.target.value));
    playSound();
  };

  const handleBlur = () => {
    if (size < 0) {
      setSize(0);
    } else if (size > 20) {
      setSize(20);
    }
  };

  useEffect(() => {
    setSessionCookie(
      "board",
      { ...sessionCookie?.board, size: size },
      { path: "/" }
    );
  }, [size]);
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
            value={typeof size === "number" ? size : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Input
            value={size}
            size="small"
            onChange={handleInputChange}
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
