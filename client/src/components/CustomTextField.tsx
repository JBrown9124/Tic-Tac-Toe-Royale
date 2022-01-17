import { useState } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
const StyledTextField = styled(TextField)({
  borderRadius: "100px",
  background: "#e8f5e9",
  "& .MuiInput-underline:before": {
    borderBottomColor: "black",
    borderRadius: "100px",
  },

  "& :focus": {
    borderRadius:"100px"
  },
  "&$focused": {
    borderRadius:"100px"
  },
  "& label.Mui-focused": {
    // backgroundColor: "white",
    borderRadius: "100px",
    "& :focus": {
      borderRadius:"100px"
    },
    "&$focused": {
      borderRadius:"100px"
    },
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
    backgroundColor: "white",
    borderRadius: "100px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#e8f5e9",
      borderRadius: "100px",
    },
    "&:hover fieldset": {
      borderColor: "#ffecb3",
      borderRadius: "100px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ffecb3",
      borderRadius: "100px",
      fontFamily: "Major Mono Display, monospace",
    },
  
  "& .MuiInput-underline:before": {
    borderRadius:"100px"
  },
    },
});
interface CustomTextFieldProps {
  onClick?: () => void;
  value: string | number;
  set?: (value: string) => void;
  sx?: any;
  //   placeholder: string;
  error: boolean;
  label: string;
  variant: "standard" | "filled" | "outlined" | undefined;
  helperText?: string | "Lobby is not found" | false;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  type,
  onChange,
}: CustomTextFieldProps) {
  return (
    <StyledTextField
      //   placeholder={ placeholder}
      onClick={onClick}
      sx={sx}
      helperText={
        <Typography
          sx={{ fontFamily: "Bungee Hairline, cursive", fontWeight: 800 }}
        >
          {helperText}
        </Typography>
      }
      type={type}
      autoComplete="off"
      label={label}
      error={error}
      value={value}
      onChange={onChange}
      variant="outlined"
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
