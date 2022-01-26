import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { powerUps } from "../../../storage/powerUps";
export default function Inventory() {
  return (
    <>
      <Grid
        container
        direction="column"
        sx={{
          borderRadius: "15px",
          p: 1,
          bgcolor: "green",
          border: "solid black 1px",
          boxShadow: 10,
        }}
      >
        <Grid item textAlign="center" sx={{ p: 1 }}>
          <Typography>Inventory</Typography>
        </Grid>
       
          <Grid container direction="row">
            <Grid item>
              <img
                style={{ width: "40px", height: "40px", cursor: "pointer" }}
                src={powerUps["1"].imgUrl}
                alt={powerUps["1"].name}
              />
            </Grid>
          </Grid>;
       
      </Grid>
    </>
  );
}
