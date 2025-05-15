import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    TextField,
    MenuItem,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Checkbox,
    Grid,
    Tabs,
    Tab,
} from "@mui/material";
import { usePendingInvoices } from "@/context";
import { Installment } from "@/common/types/account-receivable/invoice";
import { PaymentDetails } from "@/common/types/account-receivable/payment";

const ModalPayment: React.FC = () => {
    const {
        _selectedInvoice,
        _openPaymentModal,
        closePendingModal,
        getAllInvoices,
        registerPayment,
    } = usePendingInvoices();

    const [selectedCuotas, setSelectedCuotas] = useState<Installment[]>([]);
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
        invoiceId: "",
        paymentAmount: 0,
        paymentMethod: "transfer",
        referenceNumber: "",
        installmentIds: [] as string[],
        initialPaymentStatus: _selectedInvoice?.paymentAgreement?.initialPaymentStatus,
        initialPayment: _selectedInvoice?.paymentAgreement?.initialPayment,
        notes: "",
    });

    const formatCurrency = (amount: number | undefined): string => {
        if (amount === undefined) return "";
        return amount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };

    const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPaymentDetails((prev) => ({
            ...prev,
            [name]: name === "paymentAmount" ? parseFloat(parseFloat(value).toFixed(2)) : value,
        }));
    };

    const handleCuotaToggle = (index: number) => {
        let pagoInicial = 0;
        setSelectedCuotas((prev) => {
            const updatedCuotas = prev.map((cuota, idx) => {
                if (cuota.status === "pending") {
                    if (idx === index) {
                        // Toggle the selected state of the clicked cuota
                        const isSelected = !cuota.selected;

                        // If unselecting, ensure no higher cuotas remain selected
                        if (!isSelected) {
                            return { ...cuota, selected: false };
                        }

                        // If selecting, ensure all lower cuotas are selected
                        return { ...cuota, selected: true };
                    }

                    // Automatically select all lower cuotas if a higher one is selected
                    if (idx < index) {
                        return { ...cuota, selected: true };
                    }

                    // Unselect cuotas after the toggled index
                    if (idx > index) {
                        return { ...cuota, selected: false };
                    }
                }
                return cuota; // Keep overdue cuotas unchanged
            });

            if (_selectedInvoice?.paymentAgreement?.initialPaymentStatus === "pending") {
                pagoInicial = _selectedInvoice?.paymentAgreement?.initialPayment;
            }

            const total = updatedCuotas
                .filter((c) => c.selected || c.status === "overdue")
                .reduce((sum, c) => sum + c.remainingAmount, 0) + pagoInicial;

            const installmentIds = updatedCuotas
                .filter((c) => c.selected || c.status === "overdue")
                .map((c) => c.id);


            setPaymentDetails((prevDetails) => ({
                ...prevDetails,
                invoiceId: _selectedInvoice?.id || "",
                installmentIds,
                initialPaymentStatus: _selectedInvoice?.paymentAgreement?.initialPaymentStatus,
                initialPayment: _selectedInvoice?.paymentAgreement?.initialPayment,
                paymentAmount: parseFloat(total.toFixed(2)),
            }));

            return updatedCuotas;
        });
    };

    useEffect(() => {
        if (_selectedInvoice) {
            if (_selectedInvoice?.paymentAgreement) {
                let pagoInicial = 0;
                const cuotas = [..._selectedInvoice?.paymentAgreement?.Installments]
                    .filter((c) => c.status === "pending" || c.status === "overdue")
                    .sort((a, b) => new Date(a.dueDate) > new Date(b.dueDate) ? 1 : -1);

                const cuotasSeleccionadas = cuotas.map((cuota) => ({
                    ...cuota,
                    selected: cuota.status === "overdue",
                }));

                if (_selectedInvoice.paymentAgreement.initialPaymentStatus === "pending") {
                    pagoInicial = _selectedInvoice.paymentAgreement.initialPayment;
                }

                const total = cuotasSeleccionadas
                    .filter((c) => c.selected || c.status === "overdue")
                    .reduce((sum, c) => sum + c.remainingAmount, 0) + pagoInicial;

                setSelectedCuotas(cuotasSeleccionadas);
                setPaymentDetails((prev) => ({
                    ...prev,
                    invoiceId: _selectedInvoice?.id || "",
                    initialPaymentStatus: _selectedInvoice?.paymentAgreement?.initialPaymentStatus,
                    initialPayment: _selectedInvoice?.paymentAgreement?.initialPayment,
                    paymentAmount: parseFloat(total.toFixed(2)),
                }));
            } else {
                setSelectedCuotas([]);
                setPaymentDetails((prev) => ({
                    ...prev,
                    invoiceId: _selectedInvoice?.id || "",
                    paymentAmount: parseFloat((_selectedInvoice.totalDueToday || 0).toFixed(2)),
                }));
            }
        }
    }, [_selectedInvoice]);

    const handleSubmitPayment = async () => {
        if (paymentDetails.paymentAmount <= 0) {
            alert("El monto a pagar debe ser mayor a cero.");
            return;
        }

        const payload: PaymentDetails = {
            ...paymentDetails,
        };

        console.log("Payload to register payment:", payload);

        const register = await registerPayment(payload);
        if (register) {
            handleClose();
            getAllInvoices();
        }
    };

    const handleClose = () => {
        closePendingModal();
        setSelectedCuotas([]);
        setPaymentDetails({
            invoiceId: "",
            paymentAmount: 0,
            paymentMethod: "transfer",
            referenceNumber: "",
            notes: "",
        });
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    return (
        <Dialog open={_openPaymentModal} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>Pago de Factura #{_selectedInvoice?.invoiceNumber}</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    {/* Left Column */}
                    <Grid item xs={12} md={7}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
                                    <Tab label="Información General" />
                                    {_selectedInvoice?.paymentAgreement && (
                                        <Tab label="Acuerdo de Pago" />
                                    )}
                                </Tabs>
                                {tabValue === 0 && (
                                    <>
                                        <Typography variant="body1">
                                            Cliente: {_selectedInvoice?.customerName}
                                        </Typography>
                                        <Typography variant="body2">
                                            Fecha de Emisión: {formatDate(_selectedInvoice?.issueDate || "")}
                                        </Typography>
                                        <Typography variant="body2">
                                            Total: {formatCurrency(_selectedInvoice?.invoiceAmount)}
                                        </Typography>
                                        <Typography variant="body2">
                                            Intereses y Cargos: {formatCurrency(_selectedInvoice?.feesInterest)}
                                        </Typography>
                                        <Typography variant="body2">
                                            Total + Intereses y Cargos: {formatCurrency((_selectedInvoice?.invoiceAmount || 0) + (_selectedInvoice?.feesInterest || 0))}
                                        </Typography>
                                    </>
                                )}
                                {tabValue === 1 && _selectedInvoice?.paymentAgreement && (
                                    <>
                                        <Typography variant="body2">
                                            Total + Intereses y Cargos: {formatCurrency((_selectedInvoice?.invoiceAmount || 0) + (_selectedInvoice?.feesInterest || 0))}
                                        </Typography>

                                        <Typography variant="body2">
                                            Cuota Inicial: {formatCurrency(_selectedInvoice?.paymentAgreement?.initialPayment)}{" "}
                                            {_selectedInvoice?.paymentAgreement?.initialPayment > 0 && (
                                                <Typography
                                                    component="span"
                                                    sx={{
                                                        color: _selectedInvoice?.paymentAgreement?.initialPaymentStatus === "pending" ? "orange" : "green",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    ({_selectedInvoice?.paymentAgreement?.initialPaymentStatus === "pending" ? "Pendiente" : "Pagado"})
                                                </Typography>
                                            )}
                                        </Typography>
                                        <Typography variant="body2">
                                            Número de Cuotas: {_selectedInvoice?.paymentAgreement?.numberOfInstallments}
                                        </Typography>
                                        <Typography variant="body2">
                                            Total Pagado: {formatCurrency(_selectedInvoice?.amountPaid)}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Total Pendiente: {formatCurrency(_selectedInvoice?.totalDueToday)}
                                        </Typography>
                                    </>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                {_selectedInvoice?.paymentAgreement ? (
                                    <>
                                        <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                                            Cuotas seleccionadas para pagar:
                                        </Typography>

                                        <Table
                                            size="small"
                                            sx={{
                                                mt: 1,
                                                maxHeight: 150,
                                                overflowY: "auto",
                                                display: "block",
                                                backgroundColor: "background.paper",
                                                '&::-webkit-scrollbar': {
                                                    width: '8px',
                                                },
                                                '&::-webkit-scrollbar-thumb': {
                                                    backgroundColor: '#888',
                                                    borderRadius: '4px',
                                                },
                                                '&::-webkit-scrollbar-thumb:hover': {
                                                    backgroundColor: '#555',
                                                },
                                            }}
                                        >
                                            <TableHead
                                                sx={{
                                                    position: "sticky",
                                                    top: 0,
                                                    backgroundColor: "background.paper",
                                                    zIndex: 1,
                                                }}
                                            >
                                                <TableRow>
                                                    <TableCell>Seleccionar</TableCell>
                                                    <TableCell>#</TableCell>
                                                    <TableCell>Fecha Vencimiento</TableCell>
                                                    <TableCell>Monto</TableCell>
                                                    <TableCell>Estado</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {selectedCuotas.map((cuota, idx) => (
                                                    <TableRow key={idx}>
                                                        <TableCell>
                                                            <Checkbox
                                                                checked={cuota.selected}
                                                                disabled={cuota.status === "overdue"}
                                                                onChange={() => handleCuotaToggle(idx)}
                                                            />
                                                        </TableCell>
                                                        <TableCell>{cuota.installmentNumber}</TableCell>
                                                        <TableCell>{formatDate(cuota.dueDate)}</TableCell>
                                                        <TableCell>{formatCurrency(cuota.remainingAmount)}</TableCell>
                                                        <TableCell>{cuota.status}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </>
                                ) : (
                                    <>
                                        <Typography variant="body2" sx={{ mt: 2 }}>
                                            No hay acuerdo de pago asociado a esta factura.
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            sx={{ mt: 2 }}
                                            onClick={() => alert("Por favor, contacte con un asesor para solicitar un acuerdo de pago.")}
                                        >
                                            Solicitar Acuerdo de Pago
                                        </Button>
                                    </>
                                )}

                            </Grid>
                        </Grid>
                    </Grid>



                    {/* Right Column */}
                    <Grid item xs={12} md={5}>
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            Total a Pagar: {formatCurrency(paymentDetails.paymentAmount)}
                        </Typography>

                        <TextField
                            fullWidth
                            size="small"
                            margin="normal"
                            label="Método de Pago"
                            name="paymentMethod"
                            select
                            disabled
                            value={paymentDetails.paymentMethod}
                            onChange={handlePaymentChange}
                        >
                            <MenuItem value="transfer">Transferencia</MenuItem>
                            <MenuItem value="card">Tarjeta</MenuItem>
                            <MenuItem value="cash">Efectivo</MenuItem>
                        </TextField>

                        <TextField
                            fullWidth
                            margin="normal"
                            size="small"
                            label="Número de Referencia"
                            name="referenceNumber"
                            value={paymentDetails.referenceNumber}
                            onChange={handlePaymentChange}
                        />
                        <TextField
                            fullWidth
                            size="small"
                            margin="normal"
                            label="Notas"
                            name="notes"
                            multiline
                            rows={3}
                            value={paymentDetails.notes}
                            onChange={handlePaymentChange}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={handleSubmitPayment} variant="contained" color="primary">
                    Confirmar y Pagar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalPayment;
