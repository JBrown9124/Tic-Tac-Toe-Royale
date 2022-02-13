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
import Badge from '@mui/material/Badge';
import mcolbomb from "../../../img/mcol-bomb.svg";
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
  const [isSafe, setIsSafe] = useState(false);
  const [value, setValue] = useState("");
  const handlePowerUpSelect = async (powerUp: PowerUp, isSameId: boolean) => {
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

  const handleUserKeyPress = useCallback((event) => {
    const { key, keyCode } = event;

    if (key === "1") {
      setValue("1");
    }
    if (key === "2") {
      setValue("2");
    }
    if (key === "3") {
      setValue("3");
    }
    if (key === "4") {
      setValue("4");
    }
  }, []);
  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);
  useEffect(() => {
    const handlePowerKeys = async () => {
      inventoryList.forEach(async (item) => {
        if (value === "1" && item.value === 1) {
          await handlePowerUpSelect(item, 1 === selectedPowerUp.value);
        }
        if (value === "2" && item.value === 2) {
          await handlePowerUpSelect(item, 2 === selectedPowerUp.value);
        }
        if (value === "3" && item.value === 3) {
          await handlePowerUpSelect(item, 3 === selectedPowerUp.value);
        }
        if (value === "4" && item.value === 4) {
          await handlePowerUpSelect(item, 4 === selectedPowerUp.value);
        }
      });
    };

    handlePowerKeys();
  }, [value]);

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
          <Grid
           
            item
          >

            <Grid item sx={{ p: 1 }}>
            <Badge badgeContent={powerUp.quantity} invisible={powerUp.quantity<=1}>
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
                      width: "60px",
                      height: "60px",
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
