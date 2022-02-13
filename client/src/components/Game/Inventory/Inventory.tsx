import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { PowerUp, PowerUps } from "../../../Models/PowerUp";
import { Move } from "../../../Models/Move";
import { defaultPowerUp } from "../../../storage/defaultPowerUp";
import PowerUpSelect from "../../../animators/PowerUpSelect";
import PowerUpAquired from "../../../animators/PowerUpAquired";
import SelectedPower from "./SelectedPower";
import PowerOptions from "./PowerOptions";
import onFinish from "../../../creators/BoardCreators/onFinish";
interface InventoryProps {
  inventory: PowerUps;
  setCursor: (url: string) => void;
  setSelectedPowerUp: (powerUp: PowerUp) => void;
  selectedPowerUp: PowerUp;
  setSelectedPowerUpTiles: (selectedPowerUpTiles: Move[]) => void;
  setIsUsingPowerUp: (isUsingPowerUp: boolean) => void;
  // powerOrMove: string;
  isUsingPowerUp: boolean;
  isBoardCreated: boolean;
  selectedPowerUpTiles: Move[];
  onFinish: () => void;
}
export default function Inventory({
  inventory,
  setCursor,
  setSelectedPowerUp,
  selectedPowerUp,
  setSelectedPowerUpTiles,
  setIsUsingPowerUp,
  isUsingPowerUp,
  // powerOrMove,
  isBoardCreated,
  selectedPowerUpTiles,
  onFinish,
}: InventoryProps) {
  const [inventoryList] = useState<PowerUp[]>([]);

  useEffect(() => {
    if (inventoryList.length === 0) {
      for (let i = 1; i <= Object.keys(inventory).length; i++) {
        const inventoryKey = String(i);
        const powerUpItem = inventory[inventoryKey];
        powerUpItem.quantity = 0;

        inventoryList.push(powerUpItem);
      }
    } else {
      for (let i = 1; i <= Object.keys(inventory).length; i++) {
        const inventoryKey = String(i);
        const powerUpItem = inventory[inventoryKey];
        powerUpItem.quantity = 0;
      }
    }
  }, [inventory, isBoardCreated]);
  return (
    <>
      <Grid
        container
        direction="column"
        sx={{
          borderRadius: "15px",
          p: 0,
          background: "#81c784",
          border: "solid #ec407a 1px",
          boxShadow: 10,
        }}
        textAlign="center"
        justifyContent="center"
      >
        {isUsingPowerUp && (
          <Grid item>
            <SelectedPower
              selectedPowerUp={selectedPowerUp}
              selectedPowerUpTiles={selectedPowerUpTiles}
              onFinish={() => onFinish()}
            />
          </Grid>
        )}
        <Grid item>
          <PowerOptions
            inventoryList={inventoryList}
            setSelectedPowerUp={(props) => setSelectedPowerUp(props)}
            setSelectedPowerUpTiles={(props) => setSelectedPowerUpTiles(props)}
            setIsUsingPowerUp={(props) => setIsUsingPowerUp(props)}
            selectedPowerUp={selectedPowerUp}
          />
        </Grid>
      </Grid>
    </>
  );
}
