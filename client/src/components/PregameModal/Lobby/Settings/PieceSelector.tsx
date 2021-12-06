import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import StarIcon from "@mui/icons-material/Star";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import PetsIcon from "@mui/icons-material/Pets";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
const pieces = [
  <ClearIcon sx={{height:"40px",width:"40px"}}/>,
  <StarIcon sx={{height:"40px",width:"40px"}} />,
  <CircleOutlinedIcon sx={{height:"40px",width:"40px"}}/>,
  <PetsIcon sx={{height:"40px",width:"40px"}}/>,
  <FitnessCenterIcon sx={{height:"40px",width:"40px"}}/>,
  <FavoriteBorderIcon sx={{height:"40px",width:"40px"}} />,
  <ChildCareIcon sx={{height:"40px",width:"40px"}} />,
];
interface PieceSelectorProps{
setPiece:(piece:JSX.Element)=>void;
piece:JSX.Element;
}
export default function PieceSelector({setPiece, piece}:PieceSelectorProps) {


  return (
    <>
      <Grid container direction="column">
        <Grid container item justifyContent="center" spacing={2}>
          <Grid item>
            <Typography>Select your Piece</Typography>
          </Grid>
          <Grid item>{piece}</Grid>
        </Grid>
        <Grid item>
          <List
            sx={{
              width: "100%",
              height: "50px",
              maxWidth: 360,
              overflow: "auto",
            }}
          >
            {pieces.map((piece) => (
              <ListItemButton
                onClick={() => setPiece(piece)}
                sx={{ justifyContent: "center" }}
              >
                {piece}
              </ListItemButton>
            ))}
          </List>
        </Grid>
      </Grid>
    </>
  );
}
