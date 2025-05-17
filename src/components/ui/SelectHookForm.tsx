import React from "react";
import { useFormContext, Controller, FieldValues } from "react-hook-form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

interface SelectHookFormProps {
    name: string;
    label: string;
    options: { value: string; label: string }[];
    [key: string]: any;
}

const SelectHookForm: React.FC<SelectHookFormProps> = (props) => {
    const {
        control,
        formState: { errors },
    } = useFormContext<FieldValues>(); // retrieve all hook methods

    return (
        <FormControl fullWidth error={!!errors[props.name]} size="small" variant="outlined">
            <InputLabel shrink>{props.label}</InputLabel>
            <Controller
                name={props.name}
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Select
                        {...field}
                        label={props.label}
                    >
                        {props.options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />
            <FormHelperText>
                {errors[props.name]?.message?.toString()}
            </FormHelperText>
        </FormControl>
    );
};

export default SelectHookForm;
