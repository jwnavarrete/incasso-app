import React, { useState } from "react";
import {
    Modal,
    Box,
    Typography,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    TextField,
    MenuItem,
} from "@mui/material";
import { usePendingInvoices } from "./PendingInvoicesContext";


interface ModalPaymentProps {
    partialOptions: number[];
}

const ModalPayment: React.FC<ModalPaymentProps> = ({
    partialOptions,
}) => {
    const { _selectedInvoice, _openPaymentModal, closePendingModal } = usePendingInvoices();

    const [paymentMode, setPaymentMode] = useState("total");
    const [paymentDetails, setPaymentDetails] = useState({
        paymentAmount: "",
        paymentMethod: "",
        referenceNumber: "",
        notes: "",
    });

    const handlePaymentModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMode(event.target.value);
    };

    const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPaymentDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitPayment = () => {
        // Add logic to handle payment submission
        console.log("Payment Details:", paymentDetails);
    };

    return (
        <Modal open={_openPaymentModal} onClose={closePendingModal}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 450,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Register Payment
                </Typography>
                <Typography variant="body1">
                    Total to Pay:{" "}
                    {_selectedInvoice?.outstandingBalance.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })}
                </Typography>

                <FormControl component="fieldset" style={{ marginTop: 16 }}>
                    <RadioGroup row value={paymentMode} onChange={handlePaymentModeChange}>
                        <FormControlLabel
                            value="total"
                            control={<Radio />}
                            label="Pagar Total"
                        />
                        <FormControlLabel
                            value="partial"
                            control={<Radio />}
                            label="Pago Parcial"
                        />
                    </RadioGroup>
                </FormControl>

                {paymentMode === "partial" && partialOptions.length > 0 && (
                    <>
                        <Box mt={1}>
                            <Typography variant="body2">Opciones sugeridas:</Typography>
                            {partialOptions.map((amount, i) => (
                                <Button
                                    key={i}
                                    variant="outlined"
                                    size="small"
                                    onClick={() =>
                                        setPaymentDetails((prev) => ({
                                            ...prev,
                                            paymentAmount: amount.toFixed(2),
                                        }))
                                    }
                                    style={{ marginRight: 8, marginTop: 8 }}
                                >
                                    {amount.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                    })}
                                </Button>
                            ))}
                        </Box>
                        <Box mt={1}>
                            <Button
                                size="small"
                                variant="text"
                                color="primary"
                                style={{ marginLeft: 8 }}
                                onClick={() => {
                                    alert(
                                        "This option is under maintenance. Please try again later."
                                    );
                                }}
                            >
                                Generar Acuerdo de Pago
                            </Button>
                        </Box>
                    </>
                )}

                <TextField
                    fullWidth
                    size="small"
                    margin="normal"
                    label="Payment Amount"
                    type="number"
                    name="paymentAmount"
                    value={paymentDetails.paymentAmount}
                    onChange={handlePaymentChange}
                />
                <TextField
                    fullWidth
                    size="small"
                    margin="normal"
                    label="Payment Method"
                    name="paymentMethod"
                    select
                    value={paymentDetails.paymentMethod}
                    onChange={handlePaymentChange}
                >
                    <MenuItem value="transfer">Transfer</MenuItem>
                    <MenuItem value="card">Card</MenuItem>
                    <MenuItem value="cash">Cash</MenuItem>
                </TextField>

                <TextField
                    fullWidth
                    margin="normal"
                    size="small"
                    label="Reference Number"
                    name="referenceNumber"
                    value={paymentDetails.referenceNumber}
                    onChange={handlePaymentChange}
                />
                <TextField
                    fullWidth
                    size="small"
                    margin="normal"
                    label="Notes"
                    name="notes"
                    multiline
                    rows={3}
                    value={paymentDetails.notes}
                    onChange={handlePaymentChange}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitPayment}
                    style={{ marginTop: "16px" }}
                >
                    Submit Payment
                </Button>
            </Box>
        </Modal>
    );
};

export default ModalPayment;