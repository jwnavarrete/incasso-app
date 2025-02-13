import React from "react";
import {
    Box,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormHelperText,
} from "@mui/material";
import { useFormContext, Controller, FieldValues } from "react-hook-form";

interface RangeHookFormProps {
    ranges: string[];
    name: string;
    label: string;
}

const RangeHookForm: React.FC<RangeHookFormProps> = ({
    ranges,
    name,
    label,
}) => {
    const {
        control,
        formState: { errors },
    } = useFormContext<FieldValues>();

    return (
        <Box>
            <Typography variant="body2" gutterBottom>
                {label}
            </Typography>
            <FormControl component="fieldset" error={!!errors[name]}>
                <Controller
                    name={name}
                    control={control}
                    defaultValue=""
                    rules={{ required: "Please select a range" }}
                    render={({ field }) => (
                        <RadioGroup row {...field}>
                            {ranges.map((option) => (
                                <Box
                                    key={option}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        border: "1px solid #ccc",
                                        borderRadius: "16px",
                                        width: "90px",
                                        margin: "2px",
                                    }}
                                >
                                    <FormControlLabel
                                        value={option}
                                        control={<Radio />}
                                        label={option}
                                        sx={{ mx: -0.5, margin: -0.5 }}
                                    />
                                </Box>
                            ))}
                        </RadioGroup>
                    )}
                />
                <FormHelperText>{errors[name]?.message?.toString()}</FormHelperText>
            </FormControl>
        </Box>
    );
};

export default RangeHookForm;
