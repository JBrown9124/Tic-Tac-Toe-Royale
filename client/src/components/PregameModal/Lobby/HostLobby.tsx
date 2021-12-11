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
  const [color, setColor] = useState({ r: 50, g: 100, b: 150, a: 1 });
  const [size, setSize] = useState<number | number[]>(3);
  const [sessionCookies, setSessionCookies] = useCookies();

  const handleStart = () => {
    setSessionCookies("command", "start", { path: "/" });
  };

  return (
    <>
      <Grid container sx={{ textAlign: "center" }} spacing={6}>
        <Grid item xs={12} sm={6}>
          <Settings
            color={color}
            setSize={(props) => setSize(props)}
            setColor={(props) => setColor(props)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PlayerList />
        </Grid>
      </Grid>

      <Grid container justifyContent="center">
        <Grid item>
          <Button sx={{ background: "purple" }} onClick={handleLeave}>
            Leave
          </Button>
          <Button sx={{ background: "purple" }} onClick={handleStart}>
            Start
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
