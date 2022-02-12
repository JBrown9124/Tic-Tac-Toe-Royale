import { PowerUp } from "../../Models/PowerUp";
import fire from "../../img/fire.png";
import {useState, useEffect} from "react"
interface handlePowerUpKeysArgs {
    targetKey:string,
  handlePowerUpSelect: (powerUp: PowerUp, isSameId: boolean) => void;
  selectedPowerUp: PowerUp;
}
export default function usePowerUpKeyPress({
    targetKey,
  handlePowerUpSelect,
  selectedPowerUp,
}: handlePowerUpKeysArgs) {
    const [keyPressed, setKeyPressed] = useState<boolean>(false);
  
    const downHandler = ({ key }: any) => {
   
    if (key === targetKey) {
    //   handlePowerUpSelect(
    //     {
    //       name: "fire",
    //       description:
    //         "Place on an any empty tile. Spreads and destroys player owned tiles until the root of it is destroyed.",
    //       imgUrl: fire,
    //       value: 1,
    //       rules: {
    //         affectsCaster: false,
    //         direction: {
    //           isVertical: true,
    //           isHorizontal: true,
    //           isDiagonal: true,
    //         },
    //         castAnywhere: true,
    //         tilesAffected: 1,
    //         mustBeEmptyTile: true,
    //         areaShape: "line",
    //       },
    //       selectColor: "#f8bbd0",
    //       quantity: 0,
    //     },
    //     1 === selectedPowerUp.value
    //   );
    setKeyPressed(true);
    
    }
    
  };
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
   
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
 
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}
