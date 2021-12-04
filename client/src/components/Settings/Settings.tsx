import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import { RgbaColorPicker } from "react-colorful";
import Slider from "@mui/material/Slider";
import SizeSlider from './SizeSlider'
import React, { useState, useEffect } from "react";
interface SettingsProps {
  setSettings: (size: number | number[],color: {
    r: number;
    g: number;
    b: number;
    a: number;
  } ) => void;
}
export default function Settings({
  setSettings
}: SettingsProps) {
  const [color, setColor] = useState({ r: 50, g: 100, b: 150, a: 1 });
  const [size, setSize] = useState<number|number[]>(3)
 
  const handleSubmit = () => {
    setSettings(size, color)
  };

  return (

      <Grid container   direction="column" >
        <Grid item>
          <SizeSlider changeSize={(props)=>setSize(props)}/>
        </Grid>
        <Grid item>
          <RgbaColorPicker color={color} onChange={setColor} />
        </Grid>
        <Grid item>
          <Button sx={{ background: "purple" }} onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
  
   
  );
}
