import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { RgbaColorPicker, RgbaColor } from "react-colorful";
import ColorSelector from "./ColorSelector";
import SizeSlider from "./SizeSlider";
import React, { useState, useEffect } from "react";
import PieceSelector from "./PieceSelector";
import { useCookies } from "react-cookie";
import WinBy from "./WinBy";
interface SettingsProps {
  setSize: (size: number | number[]) => void;
  setColor: (color: RgbaColor) => void;

  color: RgbaColor;
}
export default function Settings({ setSize, setColor, color }: SettingsProps) {
  const [sessionCookies, setSessionCookies] = useCookies();
  useEffect(() => {
    setSessionCookies(
      "board",
      { size: 3, winBy: 3, color: { r: 232, g: 255, b: 255, a: 255 } },
      { path: "/" }
    );
  }, []);
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <SizeSlider />
      </Grid>
      <Grid item>
        <WinBy />
      </Grid>
      <Grid item>
        <ColorSelector />
      </Grid>
      <Grid item>
        <PieceSelector />
      </Grid>
    </Grid>
  );
}
