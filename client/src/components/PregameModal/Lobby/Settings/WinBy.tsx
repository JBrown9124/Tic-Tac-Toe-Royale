import Grid from "@mui/material/Grid";
import { useCookies } from "react-cookie";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import Tooltip from '@mui/material/Tooltip';
import { styled } from "@mui/material/styles";

import Zoom from '@mui/material/Zoom';
import { useSound } from "use-sound";
const StyledTextField = styled(TextField)({
  borderRadius:"100px",
  background: "#e8f5e9",
  "& .MuiInput-underline:before": {
    borderBottomColor: "black",
    borderRadius:"100px",
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
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
    backgroundColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#e8f5e9",borderRadius:"100px",
      
    },
    "&:hover fieldset": {
      borderColor: "#ffecb3",
      
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ffecb3",
     
      fontFamily: "Major Mono Display, monospace",
    },
    
  },
  // "& .MuiInput-underline:before": {
  //   borderBottomColor: " rgba(191, 189, 206, 0.986)",
  // },
  //   },
});
interface WinByProps {
  winBy: number;
  setWinBy: (value: number) => void;
  size: number;
}
export default function WinBy({ winBy, setWinBy, size }: WinByProps) {
 
  const [playSound] = useSound(
    process.env.PUBLIC_URL + "static/assets/sounds/snareForwardButton.mp3"
  );
  const handleInputChange = (value: number) => {
    setWinBy(value);
    playSound();
  };

  return (
    <>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Typography sx={{fontFamily: "Bungee Hairline, cursive", fontWeight: 800}}>Win By</Typography>
        </Grid>
       
        <Grid item>
        <Tooltip
                placement="right"
                TransitionComponent={Zoom}
                title={
                  <Typography
                    sx={{
                      fontSize: "10px",
                      fontFamily: "Bungee Hairline, cursive !important",
                      fontWeight: "800 !important",
                    }}
                  >
                    Amount of pieces in a row to win.
                  </Typography>
                }
              >
          <StyledTextField
            error={winBy > size}
            value={winBy}
            inputProps={{
              style:{fontFamily: "Bungee Hairline, cursive", fontWeight: 800},
              step: 1,
              min: 2,
              max: size,
              type: "number",
              "aria-labelledby": "winBy",
            }}
            sx={{ width: "20%", }}
            variant="outlined"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(parseInt(e.target.value))
            }
            type="number"
          />
                </Tooltip>
        </Grid>
  
      </Grid>
    </>
  );
}
