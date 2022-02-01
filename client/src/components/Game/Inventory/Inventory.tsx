import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { powerUps } from "../../../storage/powerUps";
import { useEffect, useState } from "react";
import { PowerUp, PowerUps } from "../../../Models/PowerUp";
import { Move } from "../../../Models/Move";
import PowerUpSelect from "../../../animators/PowerUpSelect";
import PowerUpAquired from "../../../animators/PowerUpAquired";
import Button from "@mui/material/Button";
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
}: InventoryProps) {
  const [inventoryList, setInventoryList] = useState<PowerUp[]>([]);
  const powerUpsWithQuantity = inventoryList.filter((item) => {
    return item.quantity !== 0;
  });
  const handlePowerUpSelect = (powerUp: PowerUp, isSameId:boolean) => {
    
    // if (powerOrMove === "Power") {
      if (!isSameId){
      setSelectedPowerUp(powerUp);
      setSelectedPowerUpTiles([]);
      setIsUsingPowerUp(true);}
      else{
        setSelectedPowerUp({
          value: 0,
          name: "",
          description: "",
          imgUrl: "",
      
          rules: {
            affectsCaster: false,
            direction: { isVertical: false, isHorizontal: false, isDiagonal: false },
            castAnywhere: false,
            tilesAffected: 0,
            mustBeEmptyTile: false,
            areaShape: "line",
          },
          selectColor: "",
          quantity: 0,
        });
      setSelectedPowerUpTiles([]);
      setIsUsingPowerUp(false);
      }
    
  };
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
              marginBottom:2
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
            <PowerUpAquired
              isAquired={powerUp.quantity > 0}
              fromY={80}
              x={0}
              delay={0}
              key={idx}
            >
              <Grid
              
                item
                onClick={() => {
                  handlePowerUpSelect(powerUp, powerUp.value === selectedPowerUp.value);
                }}
              >
                {powerUp.quantity !== 0 && (
                  <Grid
                    container
                    direction="column"
                    textAlign="center"
                    justifyContent="center"
                   
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
                            width: "40px",
                            height: "40px",
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
                          fontFamily: "Bungee Hairline, cursive",
                          fontWeight: 800,
                          p: 0,
                        }}
                      >
                        {powerUp.quantity === 1 ? "" : powerUp.quantity}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </PowerUpAquired>
          ))}
          {powerUpsWithQuantity.length === 0 && (
            <Grid
              container
              direction="column"
              sx={{
                p: 1,
              }}
            >
              <Typography
                sx={{  fontFamily: "Bungee Hairline, cursive",
                fontWeight: 800, }}
              >
                {" "}
               Go Here
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
}
