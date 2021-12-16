import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TileHover from "../../../animators/SpaceHover";
import { useState, useEffect } from "react";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { RgbaColor } from "react-colorful";
import { useCookies } from "react-cookie";
import {GameStatus} from "../../../Models/GameStatus"
import {PlayerPieces} from "../../../Models/PlayerPieces"
interface TileProps {
  chosenPiece: JSX.Element | string|undefined;
  boardColor: RgbaColor;
  newMove: any;
  value: number | JSX.Element;
  playerPieces: PlayerPieces[]|undefined
  playerNumber:number
  updateBoardCache: () => void;
  gameStatus: GameStatus
  
}
export const Tile = ({
  boardColor,
  chosenPiece,
  value,
  updateBoardCache,
  newMove,
  playerPieces,
  gameStatus,
  playerNumber
}: TileProps) => {
  const [tile, setTile] = useState<{
    value: String | JSX.Element | number | undefined;
  }>({ value: value });
  const [sessionCookies, setSessionCookies] = useCookies();
  
 
  const handleClick = () => {
    if (value ===0 ){
    setTile({ value:  chosenPiece});
    console.log(chosenPiece,"chosenPiece")
    updateBoardCache();}

  
  };
  
  
  return (
    <>
      <TileHover beforeColor={boardColor}>
        <Grid
          //  onClick={() => selectTile(rowIdx, tileIdx)}
          onClick={()=>gameStatus.whoTurn===playerNumber && gameStatus.whoWon === null ?handleClick():""}
          item
          container
          direction="column"
          sx={{
            width: "40px",
            height: "40px",
            cursor: "pointer",
            border: "solid black 1px",
          }}
        >
          <Grid item sx={{}}>
          {typeof tile.value === "number"?" ":chosenPiece}
            { playerPieces?.map((playerPiece)=>{
              if (playerPiece.playerNumber === value){
                return playerPiece.piece
             
              }
              else if (value ===playerNumber){return chosenPiece}
            })}
          </Grid>
        </Grid>
      </TileHover>
    </>
  );
};
