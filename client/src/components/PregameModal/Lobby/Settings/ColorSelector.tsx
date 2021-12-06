import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { RgbaColor, RgbaColorPicker } from "react-colorful";
import Typography from "@mui/material/Typography";
import SizeSlider from "./SizeSlider";
import React, { useState, useEffect } from "react";
interface ColorSelectorProps{
    color: RgbaColor,
    setColor:(color:RgbaColor)=>void;
}
export default function ColorSelecter({color, setColor}:ColorSelectorProps){

    return(
        <>
        <Grid container direction="column" spacing={2}>
            <Grid item>
<Typography>
    Select Board Color
</Typography>
            </Grid>
            <Grid item>
            <RgbaColorPicker color={color} onChange={setColor} />
            </Grid>
            </Grid>
        </>
    )
}