import Grid from "@mui/material/Grid";
import { PowerUp } from "../../../Models/PowerUp";
import { Move } from "../../../Models/Move";
import Typography from "@mui/material/Typography";
import CustomButton from "../../CustomButton";

interface SelectedPowerProps {
  selectedPowerUp: PowerUp;
  selectedPowerUpTiles: Move[];
  onFinish: () => void;
}
export default function SelectedPower({
  selectedPowerUp,
  selectedPowerUpTiles, onFinish
}: SelectedPowerProps) {
 
  return (
    <>
      <Grid
        container
        direction="column"
        sx={{
          borderRadius: "15px",

          bgcolor: "green",
          border: "solid black 1px",
          boxShadow: 10,
        }}
        textAlign="center"
      >
        <Grid item>
          <Typography>{selectedPowerUp.name}</Typography>
        </Grid>
        <Grid item>
          <img
            style={{ width: "50px", height: "50px" }}
            src={selectedPowerUp.imgUrl}
            alt={selectedPowerUp.name}
          />
        </Grid>
        <Grid item>
          <Typography>{selectedPowerUp.description}</Typography>
        </Grid>
        {selectedPowerUpTiles.length >=
          selectedPowerUp.rules.tilesAffected && (
          <Grid item>
            <CustomButton sx={{background:selectedPowerUp.selectColor}} onClick={()=>{onFinish()}}message={"Finished"} />
          </Grid>
        )}
      </Grid>
    </>
  );
}
