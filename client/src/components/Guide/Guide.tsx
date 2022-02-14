import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import VolumeSlider from "../VolumeSlider"
import Action from "./Action";
import { powerUps, powerUpsList } from "../../storage/powerUps";
import PulsatingAnimator from "../../animators/PulsatingAnimator";
import CustomButton from "../CustomButton";
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
interface GuideProps {
  isOpen: boolean;
  onClose: () => void;
  volume:number,
  setVolume: (volume: number) => void
}
export default function Guide({ isOpen, onClose, volume, setVolume }: GuideProps) {
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        // onClose={false}
        closeAfterTransition
        onBackdropClick={() => onClose()}
        disableAutoFocus
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Grid
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            bgcolor: "#1b5e20",
            border: "2px solid #000",
            boxShadow: 24,
            maxHeight: 700,
            width: 400,
            overflowY: "auto",
            overflowX: "hidden",
            p: 4,
          }}
        >
          <Grid sx={{ textAlign: "center", marginBottom: 3 }}>
            <CustomButton message={"Close Guide"} onClick={() => onClose()} />
          </Grid>
          <Grid sx={{justifyContent: "center", textAlign: "center",  marginBottom: 5  }} container>
            <VolumeSlider volume={volume} setVolume={(props)=>setVolume(props)}/>
          </Grid>
          {powerUpsList.map((powerUp, idx) => (
            <Action
            key={idx}
              name={powerUp.name}
              img={
                <img
                  src={powerUp.imgUrl}
                  alt={powerUp.name}
                  style={{ width: "40px", height: "40px" }}
                />
              }
              description={powerUp.description}
              value={powerUp.value}
            />
          ))}
          <Action
            name={"Use Power"}
            img={
              <PulsatingAnimator>
                <CustomButton sx={{ background: "red" }} message={`Use Fire`} />
              </PulsatingAnimator>
            }
            description={
              "If this button appears that means your power is set up properly and ready for action!"
            }
            value={"Enter"}
          />
          <Action
            name={"Move"}
            img={<CircleOutlinedIcon sx={{ width: "40px", height: "40px" }} />}
            description={"Select any open tile on the board."}
            value={"M"}
          />
          <Grid sx={{ textAlign: "center" }}>
            <CustomButton message={"Close Guide"} onClick={() => onClose()} />
          </Grid>
        </Grid>
      </Modal>
    </>
  );
}
