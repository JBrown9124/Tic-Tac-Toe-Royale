import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import React from "react";
interface JoinProps {
  handleJoinSubmit: (lobbyId: number) => void;
  handleJoinBack: () => void;
  isLobbyFound: boolean;
}
export default function Join({
  handleJoinSubmit,
  isLobbyFound,
  handleJoinBack,
}: JoinProps) {
  const [lobbyId, setLobbyId] = useState(0);
  return (
    <>
      <Grid
        container
        direction="column"
        textAlign="center"
        justifyContent="center"
        spacing={2}
      >
        <Grid item>
          <TextField
            error={isLobbyFound === false}
            helperText={isLobbyFound === false && "Lobby is not found"}
            type="number"
            label="Lobby Code"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLobbyId(parseInt(e.target.value))
            }
          />
        </Grid>

        <Grid container item textAlign="center" justifyContent="center" spacing={2}>
          <Grid item>
          <Button onClick={() => handleJoinBack()}>Back</Button></Grid>
          <Grid item>
          <Button onClick={() => handleJoinSubmit(lobbyId)}>Find</Button></Grid>
        </Grid>
      </Grid>
    </>
  );
}
