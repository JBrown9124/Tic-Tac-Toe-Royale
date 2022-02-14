import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
} from "react";
import { PowerUp, PowerUps } from "../../../Models/PowerUp";
import { Move } from "../../../Models/Move";
import { defaultPowerUp } from "../../../storage/defaultPowerUp";
import { powerUps } from "../../../storage/powerUps";
import PowerUpSelect from "../../../animators/PowerUpSelect";
import PowerUpAquired from "../../../animators/PowerUpAquired";
import usePowerKeyPress from "../../../hooks/usePowerKeyPress";
import fire from "../../../img/fire.png";
import Badge from "@mui/material/Badge";
import mcolbomb from "../../../img/mcol-bomb.svg";
interface PowerOptions {
  inventoryList: PowerUp[];
  setSelectedPowerUp: (powerUp: PowerUp) => void;
  setSelectedPowerUpTiles: (selectedPowerUpTiles: Move[]) => void;
  setIsUsingPowerUp: (isUsingPowerUp: boolean) => void;
  selectedPowerUp: PowerUp;
  selectedPowerUpTiles: Move[];
  handlePowerUpSelect: (powerUp: PowerUp, isSameId: boolean) => void;
}
export default function PowerOptions({
  inventoryList,
  setSelectedPowerUp,
  setSelectedPowerUpTiles,
  setIsUsingPowerUp,
  selectedPowerUpTiles,
  selectedPowerUp,
  handlePowerUpSelect,
}: PowerOptions) {
  const powerUpsWithQuantity = inventoryList.filter((item) => {
    return item.quantity !== 0;
  });
  const [isSafe, setIsSafe] = useState(false);
  const [value, setValue] = useState("");
  const caster = selectedPowerUp.rules.affectsCaster ? 1 : 0;

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        spacing={{ xs: 7, md: 12 }}
        sx={{ p: 0 }}
      >
        {inventoryList.map((powerUp, idx) => (
          <Grid item key={idx}>
            <Grid item sx={{ p: 1 }}>
              <Badge
                badgeContent={
                  <Typography sx={{ fontFamily: "Cinzel, serif", fontWeight:700, color:"white"  }}>
                    {powerUp.quantity}
                  </Typography>
                }
                invisible={powerUp.quantity <= 1}
              >
                <PowerUpAquired
                  isAquired={powerUp.quantity > 0}
                  fromY={0}
                  scale={1.1}
                  x={0}
                  delay={0}
                  key={idx}
                >
                  <PowerUpSelect
                    quantity={powerUp.quantity}
                    delay={0}
                    isClicked={powerUp.value === selectedPowerUp.value}
                    scale={1.1}
                  >
                    <img
                      onClick={() => {
                        handlePowerUpSelect(
                          powerUp,
                          powerUp.value === selectedPowerUp.value
                        );
                      }}
                      style={{
                        height: "8vw",
                        width: "8vw",
                        maxHeight: "60px",
                        maxWidth: "60px",
                        cursor: "pointer",
                        opacity: powerUp.quantity >= 1 ? 1 : 0.5,
                      }}
                      src={powerUp.imgUrl}
                      alt={powerUp.name}
                    />
                  </PowerUpSelect>
                </PowerUpAquired>
              </Badge>
            </Grid>

            {/* <Grid item>
              <Typography
                sx={{
                  fontFamily: "Noto Sans, sans-serif",
                  p: 0,
                }}
              >
                {powerUp.quantity === 1 ? "" : powerUp.quantity}
              </Typography>
            </Grid> */}
          </Grid>
        ))}
        {/* {powerUpsWithQuantity.length === 0 && (
          <Grid
            container
            direction="column"
            sx={{
              p: 1,
            }}
          >
            <Typography sx={{ fontFamily: "Cinzel, serif" }}>
              {" "}
              Go Here
            </Typography>
          </Grid>
        )} */}
      </Grid>
    </>
  );
}
