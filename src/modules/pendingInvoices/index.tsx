"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
} from "@mui/material";
import { TfiReload } from "react-icons/tfi";
import CollapsibleTableUI from "@/common/components/ui/CollapsibleTableUI";
import { columns } from "./Columns";
import InvoiceActions from "./Actions";
import { usePendingInvoices } from "./PendingInvoicesContext";

import ModalPayment from "./ModalPayment";
import { CollapsibleTableRow } from "@/common/components/ui/CollapsibleTableUI/types";
import api from "@/common/lib/axiosInstance";

const PendingInvoices: React.FC = () => {

  const [invoices, setInvoices] = useState<any[]>([]);
  // const { _selectedInvoice
  const fetchInvoices = async () => {
    try {
      const response = await api.get("/accounts-receivable/by-user");
      console.log(`response`, response.data.invoices);
      setInvoices(response.data.invoices);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <>
      <Box sx={{ width: "100%", mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ textAlign: "left" }}>
            <Typography variant="h6" component="h2" sx={{ display: "inline", marginRight: 2 }}>
              Facturas Pendientes
            </Typography>
            <Button
              variant="text"
              color="primary"
              size="small"
              onClick={fetchInvoices}
              startIcon={<TfiReload />}
            ></Button>
          </Box>
        </Box>
      </Box>

      <CollapsibleTableUI
        columns={columns}
        data={invoices}
        actions={({ row }: { row: CollapsibleTableRow }) => (
          <InvoiceActions row={row} />
        )}
      />

      <ModalPayment partialOptions={[]} />
    </>
  );
};

export default PendingInvoices;
