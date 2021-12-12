import Settings from "./Settings/Settings";
import Grid from "@mui/material/Grid";
import PlayerList from "./PlayerList";
import Button from "@mui/material/Button";
import { useState } from "react";
import { RgbaColorPicker, RgbaColor } from "react-colorful";
import ClearIcon from "@mui/icons-material/Clear";
import Typography from "@mui/material/Typography";
import { Player } from "../../../Models/Player";
import { useCookies } from "react-cookie";
interface PlayerListProps {
  handleLeave: () => void;
}
export default function HostLobby({ handleLeave }: PlayerListProps) {
  const [sessionCookies, setSessionCookies] = useCookies();

  const handleStart = () => {
    setSessionCookies("command", "start", { path: "/" });
  };

  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item container sx={{ textAlign: "center" }} spacing={6}>
          <Grid item xs={12} sm={6}>
            <Settings />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PlayerList />
          </Grid>
        </Grid>

        <Grid item container justifyContent="center" spacing={2}>
          <Grid item>
            <Button sx={{ background: "purple" }} onClick={handleLeave}>
              Leave
            </Button>
          </Grid>
          <Grid item>
            <Typography>{sessionCookies?.lobby?.lobbyId}</Typography>
          </Grid>
          <Grid item>
            <Button sx={{ background: "purple" }} onClick={handleStart}>
              Start
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
