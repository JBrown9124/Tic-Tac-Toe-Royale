import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { powerUps, powerUpsList } from "../../storage/powerUps";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Guide() {
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={true}
        // onClose={false}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Grid
          container
          direction="column"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            maxHeight: 800,
            maxWidth: 500,
            overflowY: "hidden",
            overflowX: "auto",
            p: 4,
          }}
        >
          {powerUpsList.map((powerUp) => (
            <Grid
              item
              container
              direction="column"
              justifyContent="center"
              textAlign="center"
            >
              <Grid item>
                <img
                  src={powerUp.imgUrl}
                  alt={powerUp.name}
                  style={{ width: "40px", height: "40px" }}
                />
              </Grid>
              <Grid item>
                <Typography>{powerUp.description}</Typography>
              </Grid>
              <Grid item>
                <Typography>{powerUp.name}</Typography>
              </Grid>
              <Grid item container direction="row">
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
                  <Typography>{powerUp.value}</Typography>{" "}
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Modal>
    </>
  );
}
