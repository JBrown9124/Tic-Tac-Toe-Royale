import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import React from "react";
interface JoinProps {
  handleJoinSubmit: (lobbyId: number) => void;
}
export default function Join({ handleJoinSubmit }: JoinProps) {
  const [lobbyId, setLobbyId] = useState(0);
  return (
    <>
      <Grid container direction="column" justifyContent="center">
        <Grid item>
          <TextField
            type="number"
            label="Lobby Code"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLobbyId(parseInt(e.target.value))
            }
          />
        </Grid>
        <Grid item textAlign="center">
          <Button onClick={() => handleJoinSubmit(lobbyId)}>Find</Button>
        </Grid>
      </Grid>
    </>
  );
}
