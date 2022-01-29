import Grid from "@mui/material/Grid";
import { PowerUp } from "../../../Models/PowerUp";
import { Move } from "../../../Models/Move";
import Typography from "@mui/material/Typography";
import CustomButton from "../../CustomButton";
import PulsatingAnimator from "../../../animators/PulsatingAnimator"
interface SelectedPowerProps {
  selectedPowerUp: PowerUp;
  selectedPowerUpTiles: Move[];
  onFinish: () => void;
}
export default function SelectedPower({
  selectedPowerUp,
  selectedPowerUpTiles,
  onFinish,
}: SelectedPowerProps) {
  const caster = selectedPowerUp.rules.affectsCaster ? 1 : 0;
  return (
    <>
      <Grid
        container
        direction="column"
        sx={{
          borderRadius: "15px",

          backgroundColor: "#ffecb3",
          border: "solid black 1px",
          boxShadow: 10,
          p: 1,
        }}
        textAlign="center"
      >
        <Grid item>
          <Typography
            sx={{
              fontFamily: "Bungee Hairline, cursive",
              fontWeight: 800,
              p: 1,
            }}
          >
            {selectedPowerUp.name}
          </Typography>
        </Grid>
        <Grid item sx={{ p: 1 }}>
          <img
            style={{ width: "50px", height: "50px" }}
            src={selectedPowerUp.imgUrl}
            alt={selectedPowerUp.name}
          />
        </Grid>
        <Grid item sx={{ p: 1 }}>
          <Typography
            sx={{ fontFamily: "Roboto, sans-serif", fontWeight: 300 }}
          >
            {selectedPowerUp.description}
          </Typography>
        </Grid>
        {selectedPowerUpTiles.length >= selectedPowerUp.rules.tilesAffected+caster && (
          <Grid item sx={{ p: 1 }}>
            <PulsatingAnimator>
            <CustomButton
              sx={{ background: selectedPowerUp.selectColor }}
              onClick={() => {
                onFinish();
              }}
              message={`Use ${selectedPowerUp.name}`}
            />
            </PulsatingAnimator>
          </Grid>
        )}
      </Grid>
    </>
  );
}
