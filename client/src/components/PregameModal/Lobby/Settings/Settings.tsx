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
interface SettingsProps{
  setPiece:(piece:string)=>void;
  playerPiece:string
}
export default function Settings({setPiece, playerPiece}:SettingsProps) {
 
 
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
        <PieceSelector playerPiece={playerPiece} setPiece={(props)=>setPiece(props)} />
      </Grid>
    </Grid>
  );
}
