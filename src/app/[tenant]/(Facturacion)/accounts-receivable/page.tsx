"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardHeader,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { Grid } from "@mui/material";
import { invoices } from "./data";
import { Box } from "@mui/system";
import SpanningTable from "./SpanningTable";
import { columns } from "./Columns";
import CustomizedDataGridUI from "@/common/components/ui/CustomizedDataGridUI";

const InvoicesTable: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ textAlign: "left" }}>
        <h2>Cuentas por Cobrar</h2>
      </Box>
      {/* <CardHeader
          title={<TextField label="Filtro" variant="outlined" size="small" />}
          action={
            <div style={{ display: "flex", gap: "8px" }}>
              <Button variant="contained" color="secondary" size="small">
                Importar
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleOpenModal}
              >
                Nueva Cuenta por Cobrar
              </Button>
            </div>
          }
        /> */}

      {/* Modal */}
      <Dialog open={open} onClose={handleCloseModal} fullWidth maxWidth="md">
        <DialogTitle>Cuenta por Cobrar</DialogTitle>
        <DialogContent>
          <Box>
            <Grid container spacing={2} mt={0.1}>
              <Grid item xs={3}>
                <TextField
                  label="Invoice No."
                  variant="outlined"
                  fullWidth
                  disabled
                  defaultValue={(invoices.length + 1)
                    .toString()
                    .padStart(10, "0")}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Identificacion"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Nombres" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Direccion" variant="outlined" fullWidth />
              </Grid>

              <Grid item xs={3}>
                <TextField label="Telefono" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Fecha de emisión"
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              {/* <Grid item xs={12}>
                  <Divider textAlign="left">Detalles</Divider>
                </Grid> */}
              <Grid item xs={12}>
                <SpanningTable />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary" size="small">
            Cancelar
          </Button>
          <Button variant="contained" color="primary" size="small">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Grid>
        <CustomizedDataGridUI
          rows={invoices}
          columns={columns}
          pageSize={10}
          rowHeight={70}
          onPageChange={(data) => {
            console.log(data);
          }}
        />
      </Grid>
    </Box>
  );
};

export default InvoicesTable;
