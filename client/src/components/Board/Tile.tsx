import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TileHover from "../../animators/SpaceHover";
import { useState, useEffect } from "react";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import {RgbaColor} from "react-colorful";
interface TileProps {
  chosenPiece: JSX.Element
  boardColor: RgbaColor;
  value:number|JSX.Element
  updateBoardCache:()=>void;
  
}
export const Tile = ({boardColor, chosenPiece, value, updateBoardCache}:TileProps) => {
  const [tile, setTile] = useState<{value:String|JSX.Element|number}>({ value: value});
  const handleClick=()=>{
    setTile({ value: chosenPiece });
    updateBoardCache();
    console.log(tile);
  }
  return (
    <>
      <TileHover beforeColor={boardColor}>
        <Grid
          //  onClick={() => selectTile(rowIdx, tileIdx)}
          onClick={handleClick}
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
          <Grid item sx={{}} >
            {typeof tile.value === "number"?" ":chosenPiece}
          </Grid>
        </Grid>
      </TileHover>
    </>
  );
};
