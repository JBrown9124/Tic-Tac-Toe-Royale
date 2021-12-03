import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SpaceHover from "../animators/SpaceHover";
import { RgbaColorPicker } from "react-colorful";

import { useState, useEffect } from "react";
interface ChooseColor {
  setBoardColor: (color: {
    r: number;
    g: number;
    b: number;
    a: number;
  }) => void;
}
export default function ChooseColor({ setBoardColor }: ChooseColor) {
  const [color, setColor] = useState({ r: 50, g: 100, b: 150, a: 1 });
  const handleSubmit = () => {
    setBoardColor(color);
  };

  return (
    <>
      <Grid item>
        <RgbaColorPicker color={color} onChange={setColor} />
        <Button sx={{ background: "purple" }} onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </>
  );
}
