import { TextField, TextFieldProps } from "@mui/material";
import { NumericFormat } from "react-number-format";

interface CurrencyInputProps{
    value: number;
    size: 'small' | 'medium' | undefined;
    label: string;
    onChange: (value: number) => void;
    defaultValue?: string | number | null;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({ value, onChange, ...muiProps }) => {
    const { defaultValue, ...rest } = muiProps;
    return (
        <NumericFormat
            value={value}
            thousandSeparator=","
            prefix="$"
            decimalScale={2}
            fixedDecimalScale
            customInput={TextField}
            fullWidth
            className=""
            onValueChange={(values) => {
                const { floatValue } = values;
                onChange(floatValue || 0);
            }}
            defaultValue={
                typeof defaultValue === 'string' ||
                typeof defaultValue === 'number' ||
                defaultValue === null ||
                defaultValue === undefined
                    ? defaultValue
                    : undefined
            }
            {...rest}
        />
    );
};
