import { useState } from "react";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { useCookies } from "react-cookie";
import Grid from "@mui/material/Grid";
import pieces from "../../../../storage/pieces";

// interface PieceSelectorProps{
// setPiece:(piece:JSX.Element)=>void;
// piece:JSX.Element;
// }
export default function PieceSelector() {
  const [sessionCookies, setSessionCookie] = useCookies();

  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography>Select your Piece</Typography>
        </Grid>
        <Grid container item direction="row">
          <Grid  xs={12} lg={6} item>
            <List
              sx={{
                height: "50px",

                overflow: "auto",
              }}
            >
              {pieces.map((piece) => (
                <ListItemButton
                  onClick={() =>
                    setSessionCookie("piece", piece.name, { path: "/" })
                  }
                  sx={{ justifyContent: "center" }}
                >
                  {piece.value}
                </ListItemButton>
              ))}
            </List>
          </Grid>
          <Grid item  xs={12} lg={6}>
            {pieces.map((piece) => {
              if (piece.name === sessionCookies?.piece) {
                return piece.value;
              }
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
