import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";

interface Installment {
  id: string;
  installmentNumber: number;
  dueDate: string;
  originalAmount: number;
  amountPaid: number;
  remainingAmount: number;
  status: string;
  paidAt: string | null; // Puede ser null si no se ha pagado
}

interface PaymentAgreement {
  totalAmount: number;
  initialPayment: number;
  initialPaymentStatus: string;
  remainingBalance: number;
  numberOfInstallments: number;
  paymentStatus: string;
  agreementExpirationDate: string;
  Installments: Installment[];
}

interface RowData {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  customerName: string;
  customerEmail: string;
  receivableStatus: string;
  amountPaid: number;
  invoiceAmount: number;
  totalFees: number;
  interest: number;
  feesInterest: number;
  totalDueToday: number;
  paymentDetail: PaymentDetail[];
  paymentAgreement: PaymentAgreement; // Agregado aquí
}

interface PaymentDetail {
  id: string;
  paymentDate: string;
  paymentAmount: number;
  paymentMethod: string;
  referenceNumber: string;
  notes: string;
}

interface RowData {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  customerName: string;
  customerEmail: string;
  receivableStatus: string;
  amountPaid: number;
  invoiceAmount: number;
  totalFees: number;
  interest: number;
  feesInterest: number;
  totalDueToday: number;
  paymentDetail: PaymentDetail[];
}

interface ModalInvoiceProps {
  isOpen: boolean;
  onClose: () => void;
  row: RowData;
}

const ModalInvoice: React.FC<ModalInvoiceProps> = ({ isOpen, onClose, row }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const formatCurrency = (amount: number | undefined): string => {
    if (amount === undefined) return "";
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          Invoice Details
        </Typography>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          sx={{ mt: 2, mb: 2 }}
          aria-label="Invoice Tabs"
        >
          <Tab label="General Info" />
          <Tab label="Payment Details" />
          <Tab label="Payment Agreement" />

          {/* <Tab label="Payment Agreements" /> */}
        </Tabs>
        {tabIndex === 0 && (
          <Box>
            <Typography component="div">
              <ul>
                <li>
                  <strong>Invoice Number:</strong> {row.invoiceNumber}
                </li>
                <li>
                  <strong>Issue Date:</strong>{" "}
                  {new Date(row.issueDate).toLocaleDateString()}
                </li>
                <li>
                  <strong>Due Date:</strong>{" "}
                  {new Date(row.dueDate).toLocaleDateString()}
                </li>
                <li>
                  <strong>Customer Name:</strong> {row.customerName}
                </li>
                <li>
                  <strong>Customer Email:</strong> {row.customerEmail}
                </li>
                <li>
                  <strong>Status:</strong> {row.receivableStatus}
                </li>
                <li>
                  <strong>Amount Paid:</strong> {formatCurrency(row.amountPaid)}
                </li>
                <li>
                  <strong>Invoice Amount:</strong> {formatCurrency(row.invoiceAmount)}
                </li>
                <li>
                  <strong>Fees:</strong> {formatCurrency(row.totalFees)}
                </li>
                <li>
                  <strong>Interest:</strong> {formatCurrency(row.interest)}
                </li>
                <li>
                  <strong>Total Due Today:</strong> {formatCurrency(row.totalDueToday)}
                </li>
              </ul>
            </Typography>
          </Box>
        )}
        {tabIndex === 1 && (
          <Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Payment Date</TableCell>
                    <TableCell>Payment Amount</TableCell>
                    <TableCell>Payment Method</TableCell>
                    <TableCell>Reference Number</TableCell>
                    <TableCell>Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.paymentDetail.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        {new Date(payment.paymentDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{formatCurrency(payment.paymentAmount)}</TableCell>
                      <TableCell>{payment.paymentMethod}</TableCell>
                      <TableCell>{payment.referenceNumber}</TableCell>
                      <TableCell>{payment.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography sx={{ mt: 2 }}>
              <strong>Total Paid:</strong>{" "}
              {formatCurrency(
                row.paymentDetail.reduce(
                  (total, payment) => total + payment.paymentAmount,
                  0
                )
              )}
            </Typography>
          </Box>
        )}
        {tabIndex === 2 && (

          <Box>
            {row.paymentAgreement ? (
              <>
                <Typography variant="h6" gutterBottom>
                  Payment Agreement Details
                </Typography>
                <Typography variant="body1">
                  <strong>Total Amount:</strong> {formatCurrency(row.paymentAgreement.totalAmount)}
                </Typography>
                <Typography variant="body1">
                  <strong>Initial Payment:</strong> {formatCurrency(row.paymentAgreement.initialPayment)} - <strong>Status:</strong> {row.paymentAgreement.initialPaymentStatus}
                </Typography>
                <Typography variant="body1">
                  <strong>Remaining Balance:</strong> {formatCurrency(row.paymentAgreement.remainingBalance)}
                </Typography>
                <Typography variant="body1">
                  <strong>Number of Installments:</strong> {row.paymentAgreement.numberOfInstallments}
                </Typography>
                <Typography variant="body1">
                  <strong>Payment Status:</strong> {row.paymentAgreement.paymentStatus}
                </Typography>
                <Typography variant="body1">
                  <strong>Agreement Expiration Date:</strong> {new Date(row.paymentAgreement.agreementExpirationDate).toLocaleDateString()}
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Installments
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                  <TableHead>
                    <TableRow>
                    <TableCell>Installment Number</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Original Amount</TableCell>
                    <TableCell>Amount Paid</TableCell>
                    <TableCell>Remaining Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Paid At</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.paymentAgreement.Installments.map((installment) => (
                    <TableRow key={installment.id}>
                      <TableCell>{installment.installmentNumber}</TableCell>
                      <TableCell>{new Date(installment.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>{formatCurrency(installment.originalAmount)}</TableCell>
                      <TableCell>{formatCurrency(installment.amountPaid)}</TableCell>
                      <TableCell>{formatCurrency(installment.remainingAmount)}</TableCell>
                      <TableCell>{installment.status}</TableCell>
                      <TableCell>
                      {installment.paidAt
                        ? new Date(installment.paidAt).toLocaleDateString()
                        : "Not Paid"}
                      </TableCell>
                    </TableRow>
                    ))}
                  </TableBody>
                  </Table>
                </TableContainer>
              </>
            ) : (
              <Typography variant="body1">No Payment Agreement Available</Typography>
            )}
          </Box>
        )}
        {/* Add more tabs as needed */}
        <Button onClick={onClose} variant="contained" sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalInvoice;