import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import { useCookies } from "react-cookie";

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
        sx={{ textAlign: "center" }}
        spacing={6}
        justifyContent="center"
      >
        <Grid
          container
          item
          direction="column"
          textAlign="right"
          sx={{ fontSize: "10px" }}
        >
         IN DEVELOPMENT
        </Grid>
        <Grid item>
          <Typography variant="h2">Welcome To Tic Tac Toe Royale!</Typography>
        </Grid>

        <Grid item>
          <TextField
            error={isError}
            value={playerName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPlayerName(e.target.value)
            }
            label="Name"
          />
        </Grid>

        <Grid container item direction="column" sx={{}} justifyContent="center">
          <Grid item md={12}>
            <Button
              onClick={() =>
                playerName.length === 0
                  ? setIsError(true)
                  : createGame(playerName)
              }
            >
              Start a game
            </Button>
          </Grid>
          <Grid item md={12}>
            <Button
              onClick={() =>
                playerName.length === 0
                  ? setIsError(true)
                  : joinGame(playerName)
              }
            >
              Join a game
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
