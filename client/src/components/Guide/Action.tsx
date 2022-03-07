import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";


interface ActionProps {
  name: string;
  description: string;
  value: number | string;
  img: JSX.Element;
}
export default function Action({ name, description, value, img }: ActionProps) {
  return (
    <Grid
      item
      container
      direction="column"
      justifyContent="center"
      textAlign="center"
      sx={{
        p: 2,
        marginBottom: 5,
      }}
    >
      <Grid item sx={{ p: 1 }}>
        <Typography
          sx={{ fontFamily: "Cinzel, serif", color: "white" }}
          variant="h5"
        >
          {name}
        </Typography>
      </Grid>
      <Grid item sx={{ p: 1 }}>
        {img}
      </Grid>
      <Grid item sx={{ p: 1 }}>
        <Typography
          sx={{ fontFamily: "Noto Sans, sans-serif", color: "white" }}
        >
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
            border: "3px solid white",
            borderRadius: "5px",
            pl: 2,
            pr: 2,
            pt: 1,
            pb: 1,
            boxShadow: 5,
            color: "white",
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
