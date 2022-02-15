import Grid from "@mui/material/Grid";
import { RgbaColor, RgbaColorPicker } from "react-colorful";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { primaryFontColor } from "../../../../themes/theme1";

interface ColorSelectorProps {
  setColor: (value: RgbaColor) => void;
  color: RgbaColor;
}
export default function ColorSelecter({ color, setColor }: ColorSelectorProps) {
  const [colorValue, setColorValue] = useState(color);
  useEffect(() => {
    const change = setTimeout(() => setColor(colorValue), 100);
    return () => clearTimeout(change);
  }, [colorValue]);
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        spacing={0}
        textAlign="center"
        sx={{
          background: "#81c784",
          borderRadius: "5px",
          p: 2,
          border: "1px solid #ec407a",
        }}
      >
        <Grid item sx={{ marginBottom: 1 }}>
          <Typography
            sx={{
              fontFamily: "Noto Sans, sans-serif",
              color: primaryFontColor,
            }}
          >
            Board Color
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            justifyContent: "center",
            textAlign: "center",
            margin: "auto",
            
          }}
        >
          <RgbaColorPicker color={colorValue} style={{width:150,height:150}}onChange={setColorValue} />
        </Grid>
      </Grid>
    </>
  );
}
