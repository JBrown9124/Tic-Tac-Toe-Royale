import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { powerUps } from "../../../storage/powerUps";
import { useEffect, useState } from "react";
import { PowerUp, PowerUps } from "../../../Models/PowerUp";
import { Move } from "../../../Models/Move";
import PowerUpSelect from "../../../animators/PowerUpSelect";
import Button from "@mui/material/Button";
interface InventoryProps {
  inventory: PowerUps;
  setCursor: (url: string) => void;
  setSelectedPowerUp: (powerUp: PowerUp) => void;
  selectedPowerUp: PowerUp;
  setSelectedPowerUpTiles: (selectedPowerUpTiles: Move[]) => void;
  setIsUsingPowerUp: (isUsingPowerUp: boolean) => void;
  powerOrMove: string;
  isUsingPowerUp: boolean;
  isBoardCreated: boolean;
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
  isBoardCreated,
}: InventoryProps) {
  const [inventoryList, setInventoryList] = useState<PowerUp[]>([]);
  const handlePowerUpSelect = (powerUp: PowerUp) => {
    if (powerOrMove === "Power") {
      setCursor(powerUp.imgUrl);
      setSelectedPowerUp(powerUp);
      setSelectedPowerUpTiles([]);
      setIsUsingPowerUp(true);
    }
  };
  useEffect(() => {
    for (let i = 1; i <= Object.keys(inventory).length; i++) {
      const inventoryKey = String(i);
      const powerUpItem = inventory[inventoryKey];
      powerUpItem.quantity = 0;
      inventoryList.push(powerUpItem);
    }
  }, [inventory]);
  return (
    <>
      <Grid
        container
        direction="column"
        sx={{
          borderRadius: "15px",
          p: 1,
          background: "#e8f5e9",
          border: "solid black 1px",
          boxShadow: 10,
        }}
        textAlign="center"
      >
        <Grid item textAlign="center" sx={{}}>
          <Typography
            sx={{
              fontFamily: "Bungee Hairline, cursive",
              fontWeight: 800,
              p: 1,
            }}
          >
            Your Powers
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ p: 1 }}
        >
          {inventoryList.map((powerUp, idx) => (
            <Grid
              item
              onClick={() => {
                handlePowerUpSelect(powerUp);
              }}
            >
              <PowerUpSelect
                delay={0}
                isClicked={powerUp.value === selectedPowerUp.value}
                scale={1.5}
              >
                <Grid
                  container
                  direction="column"
                  textAlign="center"
                  justifyContent="center"
                >
                  <Grid item>
                    <img
                      style={{
                        width: "40px",
                        height: "40px",
                        cursor: "pointer",
                      }}
                      src={powerUp.imgUrl}
                      alt={powerUp.name}
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        fontFamily: "Bungee Hairline, cursive",
                        fontWeight: 800,
                        p: 0,
                      }}
                    >
                      {powerUp.quantity}
                    </Typography>
                  </Grid>
                </Grid>
              </PowerUpSelect>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
