import { useState } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
const StyledTextField = styled(TextField)({
  "& .MuiInput-underline:before": {
    borderBottomColor: "black",
  },

  //   "& :focus": {
  //     backgroundColor: "white",
  //   },
  //   "&$focused": {
  //     backgroundColor: "white",
  //   },
  "& label.Mui-focused": {
    // backgroundColor: "white",

    // "& :focus": {
    //   backgroundColor: "white",
    // },
    // "&$focused": {
    //   backgroundColor: "white",
    // },
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
    backgroundColor: "white",
  },
  //   "& .MuiOutlinedInput-root": {
  //     "& fieldset": {
  //       borderColor: "red",
  //       backgroundColor: "white",
  //     },
  //     "&:hover fieldset": {
  //       borderColor: "yellow",
  //       backgroundColor: "white",
  //     },
  "&.Mui-focused fieldset": {
    borderColor: "black",
    backgroundColor: "white",
    fontFamily: "Major Mono Display, monospace",
  },
  // "& .MuiInput-underline:before": {
  //   borderBottomColor: " rgba(191, 189, 206, 0.986)",
  // },
  //   },
});
interface CustomTextFieldProps {
  onClick?: () => void;
  value: string|number;
  set?: (value: string) => void;
  sx?: any;
  //   placeholder: string;
  error: boolean;
  label: string;
  variant: "standard" | "filled" | "outlined" | undefined;
  helperText?:string|"Lobby is not found"|false
  type?:string,
  onChange?:(event:React.ChangeEvent<HTMLInputElement>)=>void;
}
export default function CustomTextField({
  onClick,
  value,
  set,
  sx,
  //   placeholder,
  error,
  label,
  variant,
  helperText,
  type, onChange
}: CustomTextFieldProps) {
  return (
    <StyledTextField
      //   placeholder={ placeholder}
      onClick={onClick}
      sx={sx}
      helperText={<Typography sx={{fontFamily: "Bungee Hairline, cursive", fontWeight: 800 }}>{helperText}</Typography>}
      type={ type }
      label={label}
      error={error}
      value={value}
      onChange={onChange}
      variant={variant}
      inputProps={{
        style: { fontFamily: "Bungee Hairline, cursive", fontWeight: 800 },
      }} // font size of input text
      InputLabelProps={{
        style: { fontFamily: "Bungee Hairline, cursive", fontWeight: 800 },
      }} // font size of input label
      //   sx={{
      //     width: "10vw",
      //     pointerEvents: "auto",
      //     textAlign: "center",
      //     marginTop: 1,
      //   }}
    />
  );
}
