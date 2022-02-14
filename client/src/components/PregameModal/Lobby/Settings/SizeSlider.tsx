import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import { useCookies } from "react-cookie";
import { primaryFontColor } from "../../../../themes/theme1";
import { useSound } from "use-sound";
const CustomInput = styled(Input)({
  "& .MuiInput-underline:before": {
    borderBottomColor: primaryFontColor,
    borderRadius: "100px",
  },

  // "& :focus": {
  //   backgroundColor: "white",
  // },
  // "&$focused": {
  //   backgroundColor: "white",
  // },
  "& label.Mui-focused": {
    // backgroundColor: "white",

    // "& :focus": {
    //   backgroundColor: "white",
    // },
    // "&$focused": {
    //   backgroundColor: "white",
    // },
    color: primaryFontColor,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: primaryFontColor,
    backgroundColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: primaryFontColor,
      borderRadius: "100px",
    },
    "&:hover fieldset": {
      borderColor: primaryFontColor,
    },
    "&.Mui-focused fieldset": {
      borderColor: primaryFontColor,

      fontFamily: "Noto Sans, sans-serif",
    },
  },
  // "& .MuiInput-underline:before": {
  //   borderBottomColor: " rgba(191, 189, 206, 0.986)",
  // },
  //   },
});
interface SizeSliderProps {
  setSize: (size: number) => void;
  size: number;
}
export default function SizeSlider({ setSize, size }: SizeSliderProps) {
  const [playSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/snareForwardButton.mp3", {volume:.1}
  );
  const handleSliderChange = (value: number | number[]) => {
    if (typeof value === "number") {
      setSize(value);
    }
  };

  const handleInputChange = (value: number) => {
    setSize(value);
    playSound();
  };

  const handleBlur = () => {
    if (size < 0) {
      setSize(0);
    } else if (size > 20) {
      setSize(20);
    }
  };

  return (
    <Grid
      container
      direction="column"
      spacing={0}
      sx={{
        background: "#81c784",
        borderRadius: "5px",
        border: "1px solid #ec407a",
        p: 2,
      }}
    >
      <Grid item>
        <Typography
          sx={{ fontFamily: "Noto Sans, sans-serif", color: primaryFontColor }}
        >
          Board Size
        </Typography>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <Slider
            max={15}
            step={1}
            min={3}
            sx={{ color: "#ec407a" }}
            value={size}
            onChange={(
              e: Event,
              value: number | number[],
              activeThumb: number
            ) => {
              handleSliderChange(value);
            }}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2} >
          <CustomInput
            value={size}
            size="small"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(parseInt(e.target.value));
            }}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 3,
              max: 20,
              type: "number",
              "aria-labelledby": "input-slider",
              style: {
                fontFamily: "Noto Sans, sans-serif",
              
                color: primaryFontColor,
              },
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
