import Grid from "@mui/material/Grid";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
import Typography from "@mui/material/Typography";
import BuildingBoardAnimator from "../animators/BuildingBoardAnimator";
export default function BuildingBoardSplashScreen() {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          position: "absolute",
          top: "43%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        
        }}
      >
        {/* <Grid item>
          <BuildingBoardAnimator />
        </Grid> */}
        <Grid item>
          <HashLoader
            color={"black"}
            loading={true}
            css={override}
            size={300}
          />
        </Grid>
      </Grid>
    </>
  );
}
