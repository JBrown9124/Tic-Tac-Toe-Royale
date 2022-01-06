import Grid from "@mui/material/Grid";
import { RgbaColor, RgbaColorPicker } from "react-colorful";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export default function ColorSelecter() {
  const [color, setColor] = useState<RgbaColor>({ r: 194, g: 42, b: 50, a: 1 });
  const [sessionCookie, setSessionCookie] = useCookies();

  useEffect(() => {
    setSessionCookie(
      "board",
      { ...sessionCookie?.board, color: color },
      { path: "/" }
    );
  }, [color]);
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        spacing={2}
        textAlign="center"
      >
        <Grid item>
          <Typography>Select Board Color</Typography>
        </Grid>
        <Grid
          item
          sx={{ justifyContent: "center", textAlign: "center", margin: "auto" }}
        >
          <RgbaColorPicker color={color} onChange={setColor} />
        </Grid>
      </Grid>
    </>
  );
}
