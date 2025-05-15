import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

interface SelectOptionUIProps {
  value: string;
  options: { value: string; description: string }[];
  onChange: (value: string) => void;
  label: string;
}

const SelectOptionUI: React.FC<SelectOptionUIProps> = ({
  value,
  options,
  onChange,
  label,
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value as string);
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={handleChange} label={label}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.description}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectOptionUI;
