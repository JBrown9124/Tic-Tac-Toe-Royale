import Grid from "@mui/material/Grid";
import { useState } from "react";
import CustomTextField from "../CustomTextField";
import CustomButton from "../CustomButton";
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
        sx={{marginTop:"200px"}}
        spacing={4}
      >
        <Grid item>
          <CustomTextField
            error={isLobbyFound === false}
            helperText={isLobbyFound === false && "Lobby is not found"}
            type="number"
            label="Lobby ID"
           value={lobbyId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLobbyId(parseInt(e.target.value))} variant={"standard"}          />
        </Grid>

        <Grid
          container
          item
          textAlign="center"
          justifyContent="center"
          spacing={2}
        >
          <Grid item>
            <CustomButton onClick={() => handleJoinBack()} message={"Back"} />
          </Grid>
          <Grid item>
            <CustomButton
              onClick={() => handleJoinSubmit(lobbyId)}
              message={"Find"}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
