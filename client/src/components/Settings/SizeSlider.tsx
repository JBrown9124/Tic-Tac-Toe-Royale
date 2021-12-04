import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";

interface SizeSliderProps {
  changeSize: (size: number | number[]) => void;
}
const Input = styled(MuiInput)`
  width: 42px;
`;

export default function SizeSlider({ changeSize }: SizeSliderProps) {
  const [size, setSize] = React.useState<
    number | string | Array<number | string>
  >(3);

  const handleSizeChange = (event: Event, value: number | number[]) => {
    setSize(value);
    changeSize(value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (size < 0) {
      setSize(0);
    } else if (size > 20) {
      setSize(20);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        Size
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            max={20}
            step={3}
            min={3}
            value={typeof size === "number" ? size : 0}
            onChange={handleSizeChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
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
    </Box>
  );
}
