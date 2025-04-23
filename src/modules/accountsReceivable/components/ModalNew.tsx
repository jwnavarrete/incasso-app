import React from "react";
import SpanningTable from "./SpanningTable"; // Assuming SpanningTable is another component in your project
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { AccountsReceivable } from "./types";
import api from "@/common/lib/axiosInstance";

interface ModalNewProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  invoice?: AccountsReceivable; // Replace `any` with the proper type for invoices if available
}

const initialFormValues = {
  invoiceNumber: "",
  identification: "",
  debtorFullname: "",
  debtorAddress: "",
  debtorPhone: "",
  issueDate: "",
  dueDate: "",
  debtorEmail: "",
  invoiceAmount: 0,
  porcCollection: 0,
  porcABB: 0,
};

const ModalNew: React.FC<ModalNewProps> = ({
  open,
  onClose,
  onSave,
  invoice,
}) => {
  const [formValues, setFormValues] = React.useState({
    invoiceNumber: "",
    identification: "",
    debtorFullname: "",
    debtorAddress: "",
    debtorPhone: "",
    issueDate: "",
    dueDate: "",
    debtorEmail: "",
    invoiceAmount: 0,
    porcCollection: 0,
    porcABB: 0,
  });

  React.useEffect(() => {
    if (invoice) {
      setFormValues({
        invoiceNumber: invoice?.invoiceNumber || "",
        identification: invoice?.debtor.identification || "",
        debtorFullname: invoice.customerName,
        debtorAddress: invoice?.debtor.address || "",
        debtorPhone: invoice?.debtor.phone || "",
        issueDate: invoice?.issueDate || "",
        dueDate: invoice?.dueDate || "",
        debtorEmail: invoice?.debtor.email || "",
        invoiceAmount: invoice.invoiceAmount || 0,
        porcCollection: invoice.collectionPercentage || 0,
        porcABB: invoice.abbPercentage || 0,
      });
    } else {
      setFormValues(initialFormValues);
    }
  }, [invoice]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  function formatCurrency(value: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  }

  function formatDate(date: string): string {
    if (date.includes("/")) {
      const [day, month, year] = date.split("/");
      return `${year}-${month}-${day}`;
    }
    return date;
  }

  const handleSave = () => {
    console.log(invoice?.id);
    // Implement save logic here

    console.log("Saving invoice:", formValues);
    api
      .post("/accounts-receivable", {
        ...formValues,
        invoiceAmount: Number(formValues.invoiceAmount),
        dueDate: formatDate(formValues.dueDate),
        issueDate: formatDate(formValues.issueDate),
      })
      .then((response) => {
        console.log("Invoices fetched successfully:", response.data);
        onSave();
      })
      .catch((error) => {
        console.error("Error fetching invoices:", error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Cuenta por Cobrar</DialogTitle>
      <DialogContent>
        <Box>
          <Grid container spacing={2} mt={0.1}>
            <Grid item xs={3}>
              <TextField
                label="Invoice No."
                variant="outlined"
                name="invoiceNumber"
                fullWidth
                // disabled
                onChange={handleInputChange}
                value={formValues?.invoiceNumber || ""}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Identificacion"
                name="identification"
                variant="outlined"
                fullWidth
                onChange={handleInputChange}
                value={formValues?.identification || ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="debtorFullname"
                variant="outlined"
                name="debtorFullname"
                fullWidth
                onChange={handleInputChange}
                value={formValues?.debtorFullname || ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Direccion"
                variant="outlined"
                fullWidth
                name="debtorAddress"
                onChange={handleInputChange}
                value={formValues?.debtorAddress || ""}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="debtorEmail"
                onChange={handleInputChange}
                value={formValues?.debtorEmail || ""}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Telefono"
                variant="outlined"
                fullWidth
                name="debtorPhone"
                onChange={handleInputChange}
                value={formValues?.debtorPhone || ""}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label="Monto Factura"
                variant="outlined"
                fullWidth
                name="invoiceAmount"
                onChange={handleInputChange}
                value={formValues?.invoiceAmount || 0}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label="Fecha de emisión"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="issueDate"
                onChange={handleInputChange}
                value={
                  formValues?.issueDate
                    ? formValues.issueDate.includes("T")
                      ? formValues.issueDate.split("T")[0]
                      : formValues.issueDate
                    : ""
                }
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label="Fecha de vencimiento"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="dueDate"
                onChange={handleInputChange}
                value={
                  formValues?.dueDate
                    ? formValues.dueDate.includes("T")
                      ? formValues.dueDate.split("T")[0]
                      : formValues.dueDate
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-end"
                mt={2}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                  maxWidth="300px"
                >
                  <span>Total:</span>
                  <span>
                    {formatCurrency(Number(formValues.invoiceAmount))}
                  </span>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                  maxWidth="300px"
                >
                  <span>
                    Porcentaje de cobranza {formValues.porcCollection}%:
                  </span>
                  <span>
                    {formatCurrency(
                      (Number(formValues.invoiceAmount) *
                        Number(formValues.porcCollection)) /
                        100
                    )}
                  </span>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                  maxWidth="300px"
                >
                  <span>Porcentaje ABB {formValues.porcABB}%:</span>
                  <span>
                    {formatCurrency(
                      (Number(formValues.invoiceAmount) *
                        Number(formValues.porcABB)) /
                        100
                    )}
                  </span>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                  maxWidth="300px"
                  fontWeight="bold"
                >
                  <span>Total Final:</span>
                  <span>
                    {formatCurrency(
                      Number(formValues.invoiceAmount) +
                        (Number(formValues.invoiceAmount) *
                          Number(formValues.porcCollection)) /
                          100 +
                        (Number(formValues.invoiceAmount) *
                          Number(formValues.porcABB)) /
                          100
                    )}
                  </span>
                </Box>
              </Box>
              {/* <SpanningTable /> */}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      {/* {JSON.stringify(formValues)} */}
      <DialogActions>
        <Button onClick={onClose} color="secondary" size="small">
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          size="small"
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalNew;
