import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { PowerUp, PowerUps } from "../../../Models/PowerUp";
import { Move } from "../../../Models/Move";
import { defaultPowerUp } from "../../../storage/defaultPowerUp";
import PowerUpSelect from "../../../animators/PowerUpSelect";
import PowerUpAquired from "../../../animators/PowerUpAquired";
import handlePowerUpKeys from "../../../creators/PowerUpCreators/handlePowerUpKeys";
interface PowerOptions {
  inventoryList: PowerUp[];
  setSelectedPowerUp: (powerUp: PowerUp) => void;
  setSelectedPowerUpTiles: (selectedPowerUpTiles: Move[]) => void;
  setIsUsingPowerUp: (isUsingPowerUp: boolean) => void;
  selectedPowerUp: PowerUp;
}
export default function PowerOptions({
  inventoryList,
  setSelectedPowerUp,
  setSelectedPowerUpTiles,
  setIsUsingPowerUp,
  selectedPowerUp,
}: PowerOptions) {
  const powerUpsWithQuantity = inventoryList.filter((item) => {
    return item.quantity !== 0;
  });
  const handlePowerUpSelect = (powerUp: PowerUp, isSameId: boolean) => {
    if (!isSameId) {
      setSelectedPowerUp(powerUp);
      setSelectedPowerUpTiles([]);
      setIsUsingPowerUp(true);
    } else {
      setSelectedPowerUp(defaultPowerUp);
      setSelectedPowerUpTiles([]);
      setIsUsingPowerUp(false);
    }
  };

  
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        spacing={12}
        sx={{ p: 0 }}
      >
        {inventoryList.map((powerUp, idx) => (
          //   <PowerUpAquired
          //     isAquired={powerUp.quantity > 0}
          //     fromY={80}
          //     x={0}
          //     delay={0}
          //     key={idx}
          //   >
          <Grid
            onClick={() => {
              handlePowerUpSelect(
                powerUp,
                powerUp.value === selectedPowerUp.value
              );
            }}
            item
          >
            <Grid item sx={{ p: 1 }}>
              <PowerUpSelect
                quantity={powerUp.quantity}
                delay={0}
                isClicked={powerUp.value === selectedPowerUp.value}
                scale={1.5}
              >
                <img
                  style={{
                    width: "50px",
                    height: "50px",
                    cursor: "pointer",
                  }}
                  src={powerUp.imgUrl}
                  alt={powerUp.name}
                />
              </PowerUpSelect>
            </Grid>
            <Grid item>
              <Typography
                sx={{
                  fontFamily: "Noto Sans, sans-serif",
                  p: 0,
                }}
              >
                {powerUp.quantity === 1 ? "" : powerUp.quantity}
              </Typography>
            </Grid>
          </Grid>
          //   </PowerUpAquired>
        ))}
        {powerUpsWithQuantity.length === 0 && (
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
        )}
      </Grid>
    </>
  );
}
