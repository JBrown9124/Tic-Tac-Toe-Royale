import { PowerUp } from "../Models/PowerUp";
import fire from "../../img/fire.png";
import {useState, useEffect} from "react"
interface handlePowerUpKeysArgs {
    targetKey:string,
  // handlePowerUpSelect: (powerUp: PowerUp, isSameId: boolean) => void;
  // selectedPowerUp: PowerUp;
}
export default function usePowerKeyPress(
    targetKey:string,
  // handlePowerUpSelect,
  // selectedPowerUp,
) {
    const [keyPressed, setKeyPressed] = useState<boolean>(false);
  
    const downHandler = ({ key }: any) => {
   
    if (key === targetKey) {
  
    setKeyPressed(true);
    
    }
    
  };
  const upHandler = ({ key }:any) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
 
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}
