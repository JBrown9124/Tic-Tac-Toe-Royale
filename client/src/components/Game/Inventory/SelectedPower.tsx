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
         
        }}
        textAlign="center"
        justifyContent="center"
      >
         {selectedPowerUpTiles.length >= selectedPowerUp.rules.tilesAffected+caster && (
          <Grid item sx={{ p: 1 }}>
            <PulsatingAnimator>
            <CustomButton
              // sx={{ background: selectedPowerUp.selectColor }}
              onClick={() => {
                onFinish();
              }}
              message={`Use ${selectedPowerUp.name}`}
            />
            </PulsatingAnimator>
          </Grid>
        )}
        {/* <Grid item>
          <Typography
            sx={{
              fontFamily: "Cinzel, serif",
              
              p: 1,
            }}
          >
            {selectedPowerUp.name} Selected
          </Typography>
        </Grid> */}
        {/* <Grid item sx={{ p: 1 }}>
          <img
            style={{ width: "50px", height: "50px" }}
            src={selectedPowerUp.imgUrl}
            alt={selectedPowerUp.name}
          />
        </Grid> */}
        {/* <Grid item sx={{ p: 1 }}>
          <Typography
            sx={{  fontFamily: "Noto Sans, sans-serif", fontWeight: 300 }}
          >
            {selectedPowerUp.description}
          </Typography>
        </Grid> */}
       
      </Grid>
    </>
  );
}
