import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
interface ActionProps{
    name:string,
    description:string,
    value:number|string,
    img:JSX.Element
}
export default function Action({name, description, value,img}:ActionProps) {
  return (
    <Grid
      item
      container
      direction="column"
      justifyContent="center"
      textAlign="center"
      sx={{
        background: "#81c784",
        borderRadius: "5px",
        p: 2,
        border: "1px solid #ec407a",
        marginBottom: 5,
      }}
    >
      <Grid item sx={{ p: 1 }}>
        <Typography sx={{ fontFamily: "Cinzel, serif" }} variant="h5">
          {name}
        </Typography>
      </Grid>
      <Grid item sx={{ p: 1 }}>
       {img}
      </Grid>
      <Grid item sx={{ p: 1 }}>
        <Typography sx={{ fontFamily: "Noto Sans, sans-serif" }}>
          {description}
        </Typography>
      </Grid>

      <Grid
        item
        container
        direction="row"
        justifyContent="center"
        sx={{ p: 1 }}
      >
        <Grid
          item
          sx={{
            border: "3px solid black",
            borderRadius: "5px",
            pl: 2,
            pr: 2,
            pt: 1,
            pb: 1,
            boxShadow: 5,
          }}
        >
          <Typography sx={{ fontFamily: "Noto Sans, sans-serif" }}>
            {value}
          </Typography>{" "}
        </Grid>
      </Grid>
    </Grid>
  );
}
