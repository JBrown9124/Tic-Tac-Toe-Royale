import { useState, useEffect } from "react";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { useCookies } from "react-cookie";
import Grid from "@mui/material/Grid";
import createPiece from "../../../../storage/createPiece";
import Input from "@mui/material/Input";

import Button from "@mui/material/Button";

// interface PieceSelectorProps{
// setPiece:(piece:JSX.Element)=>void;
// piece:JSX.Element;
// }
interface PieceSelectorProps{
  setPiece:(piece:string)=>void;
  playerPiece:string;
}
export default function PieceSelector({setPiece, playerPiece}:PieceSelectorProps) {
  const [sessionCookies, setSessionCookie] = useCookies();
  // const [image, setPiece] = useState<any>();

  const handleImageUpload = (event: any) => {
    getBase64(event[0], (result: string) => {
      setPiece(result);
    });
  };
  const getBase64 = (file: any, cb: any) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };
 
  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography>Select your Piece</Typography>
        </Grid>
        <Grid container item direction="row">
          <Grid xs={12} sm={6} item>
            <List
              sx={{
                height: "50px",

                overflow: "auto",
              }}
            >
              {createPiece("black").map((piece) => (
                <ListItemButton
                  onClick={() =>
                    setPiece(piece.name)
                  }
                  sx={{ justifyContent: "center" }}
                >
                  {piece.value}
                </ListItemButton>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} sm={6}>
            {playerPiece.length>15 ? (
              <img
                src={playerPiece}
                alt={playerPiece}
                style={{ width: "40px", height: "40px" }}
              />
            ) : (
              createPiece("black").map((piece) => {
                if (piece.name === playerPiece) {
                  return piece.value;
                }
              })
            )}
          </Grid>
        </Grid>
        <label htmlFor="contained-button-file">
          <Input
            sx={{ display: "none" }}
            id="contained-button-file"
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleImageUpload(e.target.files)
            }
          />
          <Button variant="contained" component="span">
            Upload
          </Button>
        </label>
      </Grid>
    </>
  );
}
