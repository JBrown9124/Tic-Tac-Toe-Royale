import Grid from "@mui/material/Grid";
import { RgbaColor, RgbaColorPicker } from "react-colorful";
import Typography from "@mui/material/Typography";
interface ColorSelectorProps{
  setColor: (value: RgbaColor) =>void;
  color:RgbaColor
}
export default function ColorSelecter({color,setColor}:ColorSelectorProps) {

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        spacing={2}
        textAlign="center"
      >
        <Grid item>
          <Typography sx={{fontFamily: "Bungee Hairline, cursive", fontWeight: 800}}>Select Board Color</Typography>
        </Grid>
        <Grid
          item
          sx={{ justifyContent: "center", textAlign: "center", margin: "auto" }}
        >
          <RgbaColorPicker color={color} onChange={setColor} />
        </Grid>
      </Grid>
    </>
  );
}
