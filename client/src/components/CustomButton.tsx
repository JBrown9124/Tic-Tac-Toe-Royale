import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#04f005',
  
  "&:hover": {
    backgroundColor: '#d9fdcc',
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
  fontFamily: "Cinzel, serif",
  boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 7px',
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
  message?: string;
  sx?: any;
  variant?: "text" | "outlined" | "contained" | undefined;
  component?:any
  icon?:JSX.Element|string
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
