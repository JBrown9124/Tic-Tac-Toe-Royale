import Settings from "./Settings/Settings";
import Grid from "@mui/material/Grid";
import PlayerList from "./PlayerList";
import Button from "@mui/material/Button";
import { useState } from "react";
import { RgbaColorPicker, RgbaColor } from "react-colorful";
import ClearIcon from "@mui/icons-material/Clear";
import Typography from "@mui/material/Typography";
interface PlayerListProps {
  setSettings: (size: number | number[], color: RgbaColor, piece: JSX.Element) => void;
}
export default function PlayersList({ setSettings }: PlayerListProps) {
  const [color, setColor] = useState({ r: 50, g: 100, b: 150, a: 1 });
  const [size, setSize] = useState<number | number[]>(3);
  const [piece, setPiece] = useState<JSX.Element>(<ClearIcon sx={{height:"40px",width:"40px"}}/>);
  const handleSubmit = () => {
    setSettings(size, color, piece);
  };

  
  return (
    <>
      <Grid container sx={{ textAlign: "center" }} justifyContent="center">
        <Grid item>
          <Typography variant="h2">Lobby</Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center">
          <Grid item xs={6}>
            <Settings
              piece={piece}
              color={color}
              setSize={(props) => setSize(props)}
              setColor={(props) => setColor(props)}
              setPiece={(props)=>setPiece(props)}
            />
          </Grid>
          <Grid item xs={6}>
            <PlayerList />
          </Grid>
        </Grid>
        <Grid item>
          <Button sx={{ background: "purple" }} onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
