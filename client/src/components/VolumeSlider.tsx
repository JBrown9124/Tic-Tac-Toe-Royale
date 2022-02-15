import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Grid from "@mui/material/Grid";
import {useEffect, useState} from "react"

interface VolumeSliderProps {
  volume: number;
  setVolume: (value: number) => void;
}
export default function VolumeSlider({ volume, setVolume }: VolumeSliderProps) {
  const [volumeValue, setVolumeValue] = useState(volume)
  const handleVolumeChange = (event: Event, newVolume: number | number[]) => {
    setVolumeValue(newVolume as number);
  };
  useEffect(() =>{
    const change = setTimeout(() => setVolume(volumeValue),100)
   return ()=> clearTimeout(change)
  },[volumeValue])
  return (
    <Box
      sx={{
        width: 200,
        background: "#81c784",
        borderRadius: "5px",
        border: "1px solid #ec407a", p:1
      }}
    >
      <Stack spacing={2} direction="row" sx={{  }} alignItems="center">
        <VolumeDown />
        <Slider
          sx={{ color: "#ec407a" }}
          aria-label="Volume"
          value={volumeValue}
          max={1}
          step={.1}
          min={0}
          onChange={handleVolumeChange}
        />
        <VolumeUp />
      </Stack>
    </Box>
  );
}
