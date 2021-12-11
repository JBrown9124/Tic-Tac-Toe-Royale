import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { RgbaColor, RgbaColorPicker } from "react-colorful";
import Typography from "@mui/material/Typography";
import SizeSlider from "./SizeSlider";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export default function ColorSelecter() {
  const [color, setColor] = useState<RgbaColor>({r:232, g:255, b:255, a:255});
  const [sessionCookies, setSessionCookies] = useCookies();
 
  useEffect(() => {
    setSessionCookies(
      "board",
      { ...sessionCookies?.board, color: color },
      { path: "/" }
    );
  }, [color]);
  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2} textAlign="center">
        <Grid item>
          <Typography>Select Board Color</Typography>
        </Grid>
        <Grid item sx={{justifyContent: "center", textAlign:"center", margin:"auto"}}>
          <RgbaColorPicker color={color} onChange={setColor} />
        </Grid>
      </Grid>
    </>
  );
}
