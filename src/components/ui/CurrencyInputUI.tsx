import { TextField, TextFieldProps } from "@mui/material";
import { NumericFormat } from "react-number-format";

interface CurrencyInputProps extends Omit<TextFieldProps, "onChange" | "value"> {
    value: number;
    onChange: (value: number) => void;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({ value, onChange, ...muiProps }) => {
    return (
        <NumericFormat
            value={value}
            thousandSeparator=","
            prefix="$"
            decimalScale={2}
            fixedDecimalScale
            customInput={TextField}
            fullWidth
            onValueChange={(values) => {
                const { floatValue } = values;
                onChange(floatValue || 0); // Pasar valor limpio
            }}
            {...muiProps} // Pasar las props de Material-UI
        />
    );
};
