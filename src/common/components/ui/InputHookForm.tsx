import React from "react";
import { useFormContext, Controller, FieldValues } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";

interface InputHookFormProps {
    name: string;
    [key: string]: any;
}

const InputHookForm: React.FC<InputHookFormProps> = (props) => {
    const {
        control,
        formState: { errors },
    } = useFormContext<FieldValues>(); // retrieve all hook methods

    return (
        <>
            <Controller
                {...props}
                control={control}
                defaultValue=""
                render={({ field: { ref, ...field } }) => (
                    <TextField
                        inputRef={ref}
                        {...field}
                        fullWidth
                        {...props}
                        size="small"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors[props.name]}
                    />
                )}
            />

            <FormHelperText error>
                {errors[props.name]?.message?.toString()}
            </FormHelperText>
        </>
    );
};

export default InputHookForm;
