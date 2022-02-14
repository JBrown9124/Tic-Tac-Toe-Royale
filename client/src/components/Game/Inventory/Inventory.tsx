import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState, useCallback } from "react";
import { PowerUp, PowerUps } from "../../../Models/PowerUp";
import { Move } from "../../../Models/Move";
import { defaultPowerUp } from "../../../storage/defaultPowerUp";
import MoveSelectAnimator from "../../../animators/MoveSelectAnimator";
import PowerUpAquired from "../../../animators/PowerUpAquired";
import CustomButton from "../../CustomButton";
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
  displayPiece: string | JSX.Element;
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
  displayPiece,
}: InventoryProps) {
  const [inventoryList] = useState<PowerUp[]>([]);
  const [isSafe, setIsSafe] = useState(false);
  const [value, setValue] = useState("");

  const handleMoveSelect = () => {
    setSelectedPowerUpTiles([]);
    setSelectedPowerUp(defaultPowerUp);
    setIsUsingPowerUp(false);
  };
  const handlePowerUpSelect = async (powerUp: PowerUp, isSameId: boolean) => {
    setIsSafe(false);

    setSelectedPowerUp(powerUp);
    setSelectedPowerUpTiles([]);
    setIsUsingPowerUp(true);
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
    if (key === "m") {
      setValue("m");
    }
    if (key === "Enter") {
      setValue("Enter");
    }
  }, []);
  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, []);
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
        if (value === "m") {
          setSelectedPowerUp(defaultPowerUp);
          setSelectedPowerUpTiles([]);
          setIsUsingPowerUp(false);
        }
        const caster = selectedPowerUp.rules.affectsCaster ? 1 : 0;
        if (
          value === "Enter" &&
          selectedPowerUpTiles.length >=
            selectedPowerUp.rules.tilesAffected + caster &&
          selectedPowerUp.value !== 0
        ) {
          onFinish();
        }
      });
    };
    if (isSafe) {
      handlePowerKeys();
    }

    const t = setTimeout(() => {
      setIsSafe(true);
    }, 300);
    return () => {
      clearTimeout(t);
    };
  }, [value]);

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
          background: "#519657",
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
        <Grid item container justifyContent="center">
          <Grid item sx={{ p: 1 }}>
            <MoveSelectAnimator
              delay={0}
              isClicked={!isUsingPowerUp}
              quantity={0}
            >
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handleMoveSelect()}
              >
                {displayPiece}{" "}
              </div>
            </MoveSelectAnimator>
          </Grid>
        </Grid>
        <Grid item>
          <PowerOptions
            handlePowerUpSelect={(powerUp, isSameId) =>
              handlePowerUpSelect(powerUp, isSameId)
            }
            selectedPowerUpTiles={selectedPowerUpTiles}
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
