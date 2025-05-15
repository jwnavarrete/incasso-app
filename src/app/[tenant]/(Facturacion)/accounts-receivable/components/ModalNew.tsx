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
// import { ICollectionParameters } from "./types";
import api from "@/lib/axiosInstance";
import InputPersona from "./Persona";
import { AccountsReceivableInvoice, ICollectionParameters } from "@/common/types/account-receivable/invoice";

interface ModalNewProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  invoice?: AccountsReceivableInvoice; // Replace `any` with the proper type for invoices if available
  tenantParameter?: ICollectionParameters; // Replace `any` with the proper type for tenant parameters if available
}

const initialFormValues = {
  id: "",
  debtorId: "",
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

interface IDebtor {
  id?: string;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  identification: string;
}

const ModalNew: React.FC<ModalNewProps> = ({
  open,
  onClose,
  onSave,
  invoice,
  tenantParameter,
}) => {
  const [formValues, setFormValues] = React.useState({
    id: "",
    debtorId: "",
    invoiceNumber: "",
    identification: "",
    debtorFullname: "",
    debtorAddress: "",
    debtorPhone: "",
    issueDate: "",
    dueDate: "",
    debtorEmail: "",
    invoiceAmount: 0,
    porcCollection: tenantParameter?.porcCobranza,
    porcABB: tenantParameter?.porcAbb,
  });

  const [debtor, setDebtor] = React.useState<IDebtor | null>(null);

  React.useEffect(() => {
    console.log(`invoice`, invoice);
    if (invoice) {
      setFormValues({
        id: invoice.id,
        debtorId: invoice?.debtor.id,
        invoiceNumber: invoice?.invoiceNumber || "",
        identification: invoice?.debtor.identification || "",
        debtorFullname: invoice.customerName,
        debtorAddress: invoice?.debtor.address || "",
        debtorPhone: invoice?.debtor.phone || "",
        issueDate: invoice?.issueDate || "",
        dueDate: invoice?.dueDate || "",
        debtorEmail: invoice?.debtor.email || "",
        invoiceAmount: invoice.invoiceAmount || 0,
        porcCollection:
          invoice.clientCollectionPercentage || tenantParameter?.porcCobranza || 0,
        porcABB: invoice.clientAbbPercentage || tenantParameter?.porcAbb || 0,
      });

      setDebtor({
        id: invoice?.debtor.id,
        fullname: invoice.customerName,
        email: invoice?.debtor.email || "",
        phone: invoice?.debtor.phone || "",
        address: invoice?.debtor.address || "",
        identification: invoice?.debtor.identification || "",
      });

      calculateCollection()
    } else {
      handleClean();
    }
  }, [invoice, tenantParameter]);

  const handleClean = () => {
    setFormValues({
      ...initialFormValues,
      porcABB: tenantParameter?.porcAbb,
      porcCollection: tenantParameter?.porcCobranza,
    });
    setDebtor(null);
  };

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

  const handleValidation = () => {
    const requiredFields = [
      "invoiceNumber",
      "identification",
      "debtorFullname",
      "debtorAddress",
      "debtorPhone",
      "issueDate",
      "dueDate",
      "debtorEmail",
      "invoiceAmount",
    ];

    for (const field of requiredFields) {
      if (!formValues[field as keyof typeof formValues]) {
        alert(`El campo ${field} es obligatorio.`);
        return false;
      }
    }

    if (!/\S+@\S+\.\S+/.test(formValues.debtorEmail)) {
      alert("El correo electrónico no es válido.");
      return false;
    }

    if (
      isNaN(Number(formValues.invoiceAmount)) ||
      Number(formValues.invoiceAmount) <= 0
    ) {
      alert("El monto de la factura debe ser un número mayor a 0.");
      return false;
    }

    return true;
  };
  const handleSave = () => {
    console.log(invoice?.id);
    // Implement save logic here
    if (!handleValidation()) {
      return;
    }

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
        handleClean();
        onSave();
      })
      .catch((error) => {
        console.error("Error fetching invoices:", error);
      });
  };

  const calculateCollection = (
  ) => {
    const collectionAmount = (formValues.invoiceAmount * (formValues.porcCollection || 0)) / 100;
    return collectionAmount;
  }

  const calculateABB = () => {
    const collectionAmount = calculateCollection();

    const abbAmount = (collectionAmount * (formValues.porcABB || 0)) / 100;
    return abbAmount;
  };

  const calculateTotal = () => {
    const collectionAmount = calculateCollection();
    const abbAmount = calculateABB();
    const total = Number(formValues.invoiceAmount) + collectionAmount + abbAmount;

    return total;
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Cuenta por Cobrar</DialogTitle>
      <DialogContent>
        {/* {JSON.stringify(invoice)} */}
        <Box>
          <Grid container spacing={2} mt={0.1}>
            <Grid item xs={4}>
              <TextField
                label="Invoice No."
                variant="outlined"
                name="invoiceNumber"
                fullWidth
                size="small"
                onChange={handleInputChange}
                value={formValues?.invoiceNumber || ""}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <InputPersona
                  currectDebtor={debtor}
                  onPersonaSelect={(persona) => {
                    if (persona) {
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        debtorId: persona.id || "",
                        identification: persona.identification,
                        debtorFullname: persona.fullname,
                        debtorEmail: persona.email,
                        debtorPhone: persona.phone,
                        debtorAddress: persona.address,
                      }));
                    }
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                size="small"
                disabled
                name="debtorEmail"
                onChange={handleInputChange}
                value={formValues?.debtorEmail || ""}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Telefono"
                variant="outlined"
                size="small"
                disabled
                fullWidth
                name="debtorPhone"
                onChange={handleInputChange}
                value={formValues?.debtorPhone || ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Direccion"
                variant="outlined"
                fullWidth
                size="small"
                disabled
                name="debtorAddress"
                onChange={handleInputChange}
                value={formValues?.debtorAddress || ""}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Monto Factura"
                variant="outlined"
                fullWidth
                size="small"
                name="invoiceAmount"
                onChange={handleInputChange}
                value={formValues?.invoiceAmount || 0}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Fecha de emisión"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                name="issueDate"
                size="small"
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

            <Grid item xs={4}>
              <TextField
                label="Fecha de vencimiento"
                type="date"
                variant="outlined"
                fullWidth
                size="small"
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
                    {formatCurrency(calculateCollection())}
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
                    {formatCurrency(calculateABB())}
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
                    {formatCurrency(calculateTotal())}
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
        {!formValues.id && (
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            size="small"
          >
            Guardar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ModalNew;
