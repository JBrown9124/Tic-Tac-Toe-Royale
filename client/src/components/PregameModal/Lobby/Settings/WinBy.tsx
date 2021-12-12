import Grid from "@mui/material/Grid";
import { useCookies } from "react-cookie";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
export default function WinBy() {
  const [sessionCookies, setSessionCookies] = useCookies();
  const [winBy, setWinBy] = useState(3);
  useEffect(() => {
    
      setSessionCookies(
        "board",
        { ...sessionCookies?.board, winBy: winBy },
        { path: "/" }
      );
    
  }, [winBy]);
  
  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <Typography>Win By</Typography>
        </Grid>
        <Grid item>
          <TextField
            error={
              winBy >
                (sessionCookies?.board?.size === undefined
                  ? 3
                  : sessionCookies?.board?.size) 
            }
            inputProps={{
              defaultValue:3,
              step: 1,
              min: 3,
              max:
              sessionCookies?.board?.size === undefined
                  ? 3
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
