import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import CustomButton from "../CustomButton";
import CustomTextField from "../CustomTextField";

interface OpenPageProps {
  createGame: (name: string) => void;
  joinGame: (name: string) => void;
  playerName: string;
  setPlayerName: (name: string) => void;
}
export default function Welcome({
  createGame,
  joinGame,
  playerName,
  setPlayerName,
}: OpenPageProps) {
  const [isError, setIsError] = useState(false);

  return (
    <>
      <Grid
        container
        sx={{ textAlign: "center", marginTop: { lg: "100px" } }}
        spacing={6}
        justifyContent="center"
      >
        <Grid container item direction="column">
          <Grid item>
            {" "}
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Major Mono Display, monospace",
                p: 2,
                color: "#bc477b",
                fontSize: "5rem",
              }}
            >
              Tic-Tac-Toe Royale
            </Typography>
          </Grid>
        </Grid>

        <Grid item>
          <CustomTextField
            sx={{ boxShadow: 3 }}
            onClick={() => setIsError(false)}
            error={isError}
            value={playerName}
            set={setPlayerName}
            label={"Your Nickname"}
            variant="standard"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPlayerName(e.target.value)
            }
          />
        </Grid>

        <Grid
          sx={{ marginTop: 3 }}
          container
          item
          direction={{ xs: "row", sm: "row", md: "row", lg:"row" }}
          justifyContent="center"
        >
          <Grid item sm={6} xs={6}md={6}  lg={6}>
            <CustomButton
              message={"Start"}
              sx={{ p: 3 }}
              onClick={() =>
                playerName.length === 0
                  ? setIsError(true)
                  : createGame(playerName)
              }
            />
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            lg={6}
            
          >
            <CustomButton
              message={"Join"}
              sx={{ p: 3 }}
              onClick={() =>
                playerName.length === 0
                  ? setIsError(true)
                  : joinGame(playerName)
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
