import Grid from "@mui/material/Grid";
import { useCookies } from "react-cookie";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import {useSound} from 'use-sound'
export default function WinBy() {
  const [sessionCookies, setSessionCookies] = useCookies();
  const [winBy, setWinBy] = useState(2);
  const [playSound] = useSound(
    process.env.PUBLIC_URL + "/assets/sounds/snareForwardButton.mp3", 
  );
  useEffect(() => {
    
      setSessionCookies(
        "board",
        { ...sessionCookies?.board, winBy: winBy },
        { path: "/" }
      );
      playSound()
  }, [winBy]);
  
  return (
    <>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Typography>Win By</Typography>
        </Grid>
        <Grid item>
          <TextField
            error={
              winBy >
                (sessionCookies?.board?.size === undefined
                  ? 2
                  : sessionCookies?.board?.size) 
            }
            inputProps={{
              defaultValue:2,
              step: 1,
              min: 2,
              max:
              sessionCookies?.board?.size === undefined
                  ? 2
                  : sessionCookies?.board?.size,
              type: "number",
              "aria-labelledby": "winBy",
            }}
            sx={{ width: "20%" }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setWinBy(parseInt(e.target.value))
            }
            type="number"
          />
        </Grid>
      </Grid>
    </>
  );
}
