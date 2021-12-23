import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { ChangeEventHandler } from "react";

import { useCookies } from "react-cookie";

interface OpenPageProps {
  createGame: (name: string) => void;
  joinGame: (name: string) => void;
}
export default function Welcome({ createGame, joinGame }: OpenPageProps) {
  const [name, setName] = useState("Tic Tac Toe Master");
  const [sessionCookies, setSessionCookies] = useCookies();
  const [isError, setIsError] = useState(false);

  return (
    <>
      <Grid
        container
        sx={{ textAlign: "center" }}
        spacing={6}
        justifyContent="center"
      >
        <Grid item>
          <Typography variant="h2">Welcome To Tic Tac Toe Royale!</Typography>
        </Grid>
        <Grid item>
          <TextField
            error={isError}
            value={sessionCookies.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSessionCookies("name", e.target.value, { path: "/" })
            }
            label="Name"
          />
        </Grid>
        <Grid container item direction="column" sx={{}} justifyContent="center">
          <Grid item md={12}>
            <Button
              onClick={() =>
                sessionCookies?.name?.length === 0 ||
                sessionCookies?.name === undefined
                  ? setIsError(true)
                  : createGame(name)
              }
            >
              Start a game
            </Button>
          </Grid>
          <Grid item md={12}>
            <Button
              onClick={() =>
                sessionCookies?.name?.length === 0 ||
                sessionCookies?.name === undefined
                  ? setIsError(true)
                  : joinGame(name)
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
