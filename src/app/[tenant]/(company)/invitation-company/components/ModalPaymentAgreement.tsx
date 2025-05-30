import React, { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import { CurrencyInput } from '@/components/ui/CurrencyInputUI';
import { AccountsReceivableInvoice } from '@/common/types/account-receivable/invoice';
import { formatCurrency, formatDate } from '@/utils/general';

import { usePendingInvoices } from "@/context";


interface ModalPaymentAgreementProps {
    open: boolean;
    onClose: () => void;
    invoice?: AccountsReceivableInvoice;
}

const ModalPaymentAgreement: React.FC<ModalPaymentAgreementProps> = ({
    open,
    onClose,
    invoice,
}) => {
    const { registerPaymentAgreement } = usePendingInvoices();

    const [totalAmount, setTotalAmount] = useState(0);
    const [initialPayment, setInitialPayment] = useState(0);
    const [hasPaymentAgreement, setHasPaymentAgreement] = useState(false);
    const [initialPaymentDeadline, setInitialPaymentDeadline] = useState(
        new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0]
    );
    const [installments, setInstallments] = useState('3');
    const [frequency, setFrequency] = useState('mensual');
    const [installmentsPreview, setInstallmentsPreview] = useState<{ installmentNumber: number; amount: string; dueDate: string; }[]>([]);

    const handleClose = () => {
        setInitialPayment(0);
        setInitialPaymentDeadline(
            new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0]
        );
        setInstallments('3');
        setFrequency('mensual');
        // setTotalAmount(0);
        onClose();
    };

    useEffect(() => {
        if (invoice) {
            setTotalAmount(invoice.totalDueToday);
        }
        if (invoice?.hasPaymentAgreement === true) {
            setHasPaymentAgreement(true);
        }
    }, [invoice]);

    const handleSave = async () => {
        const payload = {
            initialPayment,
            initialPaymentDeadline,
            installments: parseInt(installments, 10),
            installmentsDetail: installmentsPreview,
            frequency,
            invoiceId: invoice?.id,
            totalAmount,
        };

        const result = await registerPaymentAgreement(payload);
        console.log('Payload to save:', payload);
        console.log('Result of saving:', result);

        if (result) {
            handleClose();
        }
    };


    const generateInstallments = () => {
        const installmentsArray = Array.from({ length: parseInt(installments, 10) }).map((_, index) => {
            let installmentAmount = ((totalAmount - initialPayment) / parseInt(installments, 10)).toFixed(2);
            const baseDate = new Date(initialPaymentDeadline);
            const installmentDate = new Date(baseDate);

            if (frequency === 'mensual') {
                installmentDate.setMonth(baseDate.getMonth() + index);
                const originalDay = baseDate.getDate();
                if (installmentDate.getDate() !== originalDay) {
                    installmentDate.setDate(0);
                }
            } else if (frequency === 'quincenal') {
                const monthsToAdd = Math.floor(index / 2);
                const isFirstHalf = index % 2 === 0;
                const targetMonth = baseDate.getMonth() + monthsToAdd;
                const targetYear = baseDate.getFullYear();

                if (isFirstHalf) {
                    installmentDate.setFullYear(targetYear, targetMonth, 15);
                } else {
                    const lastDay = new Date(targetYear, targetMonth + 1, 0).getDate();
                    installmentDate.setFullYear(targetYear, targetMonth, lastDay);
                }
            } else if (frequency === 'semanal') {
                installmentDate.setDate(baseDate.getDate() + index * 7);
            }

            if (index === 0) {
                const totalInstallmentsAmount = parseFloat(installmentAmount) * parseInt(installments, 10);
                const difference = totalAmount - initialPayment - totalInstallmentsAmount;
                installmentAmount = (parseFloat(installmentAmount) + difference).toFixed(2);
            }

            return {
                installmentNumber: index + 1,
                amount: installmentAmount,
                dueDate: installmentDate.toISOString().split('T')[0],
            };
        });

        setInstallmentsPreview(installmentsArray);
        return installmentsArray;
    };

    useEffect(() => {
        generateInstallments();
    }, [initialPayment, installments, frequency, initialPaymentDeadline, totalAmount]);


    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Acuerdo de Pago</DialogTitle>
            <DialogContent>
                {/* Resumen General de la Deuda */}
                <Typography variant="h6" gutterBottom>
                    Resumen General de la Deuda
                </Typography>
                <Box mb={2}>
                    <Typography>Nombre del cliente: {invoice?.customerName}</Typography>
                    <Typography>Número de factura(s): {invoice?.invoiceNumber}</Typography>
                    {/* <Typography>Monto de factura: {formatCurrency(invoice?.invoiceAmount || 0)}</Typography> */}
                    {/* <Typography>Fees / Interes: {formatCurrency(invoice?.totalFees || 0)}</Typography> */}
                    <Typography>Fecha(s) de vencimiento: {formatDate(invoice?.dueDate || "")}</Typography>
                    <Typography>Monto total adeudado: {formatCurrency(totalAmount)}</Typography>
                    {/* <Typography>Estado actual: {invoice?.collectionStatus}</Typography> */}
                </Box>

                {hasPaymentAgreement ? (<>
                    <Typography variant="h6" gutterBottom>
                        Información del Acuerdo de Pago
                    </Typography>
                    <Box mb={2}>
                        <Typography>Cuota inicial: {formatCurrency(invoice?.paymentAgreement?.initialPayment || 0)}</Typography>
                        <Typography>Fecha de la cuota inicial: {formatDate(invoice?.paymentAgreement?.initialPaymentDeadline || "")}</Typography>
                        <Typography>Total pagado: {formatCurrency(invoice?.paymentAgreement?.totalPaid || 0)}</Typography>
                        <Typography>Total restante: {formatCurrency(invoice?.paymentAgreement?.remainingBalance || 0)}</Typography>
                        <Typography>Cuotas restantes: {invoice?.paymentAgreement?.numberOfInstallments}</Typography>

                        <Typography>Estado del acuerdo: {invoice?.paymentAgreement?.paymentStatus}</Typography>
                        <Typography variant="h6" gutterBottom>
                            Detalle de Cuotas
                        </Typography>
                        <Table size="small" stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Cuota</TableCell>
                                    <TableCell>Monto Original</TableCell>
                                    <TableCell>Monto Pagado</TableCell>
                                    <TableCell>Monto Restante</TableCell>
                                    <TableCell>Fecha de Vencimiento</TableCell>
                                    <TableCell>Estado</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {invoice?.paymentAgreement?.Installments.sort((a, b) => a.installmentNumber - b.installmentNumber).map((installment) => (
                                    <TableRow key={installment.id}>
                                        <TableCell>{installment.installmentNumber}</TableCell>
                                        <TableCell>{formatCurrency(installment.originalAmount)}</TableCell>
                                        <TableCell>{formatCurrency(installment.amountPaid)}</TableCell>
                                        <TableCell>{formatCurrency(installment.remainingAmount)}</TableCell>
                                        <TableCell>{formatDate(installment.dueDate)}</TableCell>
                                        <TableCell>{installment.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </>) : (<>
                    {/* Configuración del Acuerdo de Pago */}
                    <Typography variant="h6" gutterBottom>
                        Configuración del Acuerdo de Pago
                    </Typography>
                    <Box mb={2}>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Frecuencia"
                                    value={frequency}
                                    size="small"
                                    onChange={(e) => setFrequency(e.target.value)}
                                >
                                    <MenuItem value="semanal">Semanal</MenuItem>
                                    <MenuItem value="quincenal">Quincenal</MenuItem>
                                    <MenuItem value="mensual">Mensual</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Número de cuotas"
                                    value={installments}
                                    size="small"
                                    onChange={(e) => setInstallments(e.target.value)}
                                >
                                    {Array.from({ length: 18 }, (_, i) => i + 1).map((num) => (
                                        <MenuItem key={num} value={num}>
                                            {num}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Fecha pago cuota inicial"
                                    type="date"
                                    size="small"
                                    value={initialPaymentDeadline}
                                    onChange={(e) => setInitialPaymentDeadline(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{
                                        min: new Date().toISOString().split('T')[0],
                                        max: new Date(
                                            new Date().setDate(new Date().getDate() + 60)
                                        )
                                            .toISOString()
                                            .split('T')[0],
                                    }}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <CurrencyInput value={initialPayment} size='small' label="Cuota Inicial" onChange={setInitialPayment} />
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Información del Acuerdo */}
                    <Typography variant="h6" gutterBottom>
                        Información del Acuerdo
                    </Typography>
                    <Box mb={2}>
                        {initialPayment && installments && initialPayment > 0 && parseInt(installments, 10) > 0 ? (
                            <Typography>
                                Se ha configurado un pago inicial de ${initialPayment}, seguido de{' '}
                                {installments} cuotas de $
                                {((totalAmount - initialPayment) / parseInt(installments, 10)).toFixed(2)} cada una.
                            </Typography>
                        ) : installments && parseInt(installments, 10) > 0 ? (
                            <Typography>
                                Se ha configurado un total de {installments} pagos de{' '}
                                {formatCurrency(totalAmount / parseInt(installments, 10))} cada uno.
                            </Typography>
                        ) : null}
                    </Box>
                    {/* Previsualización de Cuotas */}

                    {installments && frequency && initialPaymentDeadline && (
                        <Box mb={2}>
                            <Typography variant="h6" gutterBottom>
                                Previsualización de Cuotas
                            </Typography>
                            <Accordion>
                                <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
                                    <Typography>Ver detalle de cuotas</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box >
                                        <Table size="small" stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Cuota</TableCell>
                                                    <TableCell>Monto</TableCell>
                                                    <TableCell>Fecha de vencimiento</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {installmentsPreview.map((installment, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{installment.installmentNumber}</TableCell>
                                                        <TableCell>${installment.amount}</TableCell>
                                                        <TableCell>{installment.dueDate}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    )}
                </>)}


            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancelar
                </Button>
                {!hasPaymentAgreement && (
                    <Button onClick={handleSave} color="primary">
                        Guardar
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default ModalPaymentAgreement;