import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { RgbaColorPicker, RgbaColor } from "react-colorful";
import ColorSelector from "./ColorSelector";
import SizeSlider from "./SizeSlider";
import React, { useState, useEffect } from "react";
import PieceSelector from "./PieceSelector";
interface SettingsProps {
  setSize: (size: number | number[]) => void;
  setColor: (color: RgbaColor) => void;
  setPiece: (piece: JSX.Element) => void;
  color: RgbaColor;
  piece: JSX.Element;
}
export default function Settings({ setSize, setColor, color, setPiece, piece }: SettingsProps) {
  return (
    <Grid container  spacing={5} direction="column">
      <Grid item>
        <SizeSlider changeSize={(props) => setSize(props)} />
      </Grid>
      <Grid item>
        <ColorSelector setColor={(props) => setColor(props)} color={color} />
      </Grid>
      <Grid item>
      <PieceSelector piece={piece} setPiece={(props) => setPiece(props)}/>
      </Grid>
    </Grid>
  );
}
