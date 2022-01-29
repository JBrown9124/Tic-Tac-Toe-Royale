import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#ffecb3",

  "&:hover": {
    backgroundColor: "#fff8e1",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
  fontFamily: "Major Mono Display, monospace",
  boxShadow:'rgba(0, 0, 0, 0.24) 0px 1px 4px',
  color: "black",
  fill: "transparent",
  textTransform: "none",
  
  height: "50px",
  
  // fontSize: "1.1rem",
  borderRadius:"60px",
  //   [theme.breakpoints.up("md")]: {
  //     fontSize: "1.1rem",
  //     height: "50px",
      
  //   },
  //   [theme.breakpoints.down("md")]: {
  //     fontSize: ".8rem",
  //     height: "50px",
      
  //   },
}));
interface CustomButtonProps {
  onClick?: () => void;
  message: string;
  sx?: any;
  variant?: "text" | "outlined" | "contained" | undefined;
  component?:any
  icon?:JSX.Element
}
export default function CustomButton({
  message,
  onClick,
  sx,
  variant,
  component,
  icon
}: CustomButtonProps) {
  return (
    <StyledButton sx={sx} onClick={onClick} variant={variant}  >
      {message}{icon}
    </StyledButton>
  );
}
