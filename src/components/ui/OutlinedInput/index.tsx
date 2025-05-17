import React from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";

interface DynamicOutlinedInputProps {
  id: string;
  label: string;
  adornment: string;
  sx?: object;
  defaultValue?: string; // Added defaultValue prop
}

const DynamicOutlinedInput: React.FC<DynamicOutlinedInputProps> = ({
  id,
  label,
  adornment,
  sx,
  defaultValue,
}) => {
  return (
    <FormControl sx={{ m: 1, ...sx }}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        startAdornment={
          <InputAdornment position="start">{adornment}</InputAdornment>
        }
        label={label}
        defaultValue={defaultValue} // Added defaultValue usage
      />
    </FormControl>
  );
};

export default DynamicOutlinedInput;
