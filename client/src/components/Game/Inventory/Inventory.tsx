import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { powerUps } from "../../../storage/powerUps";
import { useState } from "react";
import { PowerUp } from "../../../Models/PowerUp";
import { Move } from "../../../Models/Move";
import PowerUpSelect from "../../../animators/PowerUpSelect";
import Button from "@mui/material/Button";
interface InventoryProps {
  inventory: PowerUp[];
  setCursor: (url: string) => void;
  setSelectedPowerUp: (powerUp: PowerUp) => void;
  selectedPowerUp: PowerUp;
  setSelectedPowerUpTiles: (selectedPowerUpTiles: Move[]) => void;
  setIsUsingPowerUp: (isUsingPowerUp: boolean) => void;
  powerOrMove: string;
  isUsingPowerUp: boolean;
}
export default function Inventory({
  inventory,
  setCursor,
  setSelectedPowerUp,
  selectedPowerUp,
  setSelectedPowerUpTiles,
  setIsUsingPowerUp,
  isUsingPowerUp,
  powerOrMove,
}: InventoryProps) {
  const handlePowerUpSelect = (powerUp: PowerUp) => {
    if (powerOrMove === "Power") {
      setCursor(powerUp.imgUrl);
      setSelectedPowerUp(powerUp);
      setSelectedPowerUpTiles([]);
      setIsUsingPowerUp(true);
    }
  };

  return (
    <>
      <Grid
        container
        direction="column"
        sx={{
          borderRadius: "15px",
          p: 1,
          bgcolor: "green",
          border: "solid black 1px",
          boxShadow: 10,
        }}
        textAlign="center"
      >
        <Grid item textAlign="center" sx={{ p: 1 }}>
          <Typography>Inventory</Typography>
        </Grid>
        <Grid container direction="row" spacing={2} justifyContent="center">
          {inventory.map((powerUp, idx) => (
            <Grid
              item
              onClick={() => {
                handlePowerUpSelect(powerUp);
              }}
            >
              <PowerUpSelect
                delay={0}
                isClicked={powerUp.id === selectedPowerUp.id}
                scale={1.5}
              >
                <img
                  style={{ width: "40px", height: "40px", cursor: "pointer" }}
                  src={powerUp.imgUrl}
                  alt={powerUp.name}
                />
              </PowerUpSelect>
            </Grid>
          ))}
        </Grid>
      
      </Grid>
    </>
  );
}
