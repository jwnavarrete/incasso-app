import React, { useState } from "react";
import { useFormContext, Controller, FieldValues } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface InputHookFormProps {
  name: string;
  type?: string;
  [key: string]: any;
}

const InputHookForm: React.FC<InputHookFormProps> = (props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FieldValues>(); // retrieve all hook methods

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

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
            type={
              props.type === "password" && !showPassword ? "password" : "text"
            }
            InputProps={
              props.type === "password"
                ? {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          style={{ border: "none", background: "transparent"}}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                : undefined
            }
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
