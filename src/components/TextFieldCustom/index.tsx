import React from "react";
import { TextField } from "@mui/material";
import { TextFieldCustomProps } from "./text-field-custom.model";

const TextFieldCustom = (props: TextFieldCustomProps) => {
  const { placeholder, onChange, ...rest } = props;
  return (
    <TextField
      fullWidth
      size="small"
      variant="outlined"
      placeholder={placeholder}
      onChange={onChange}
      {...rest}
    />
  );
};
export default TextFieldCustom;
