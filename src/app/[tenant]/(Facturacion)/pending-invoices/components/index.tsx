"use client";
import React, { useEffect } from "react";
import {
  Button,
  Box,
  Typography,
} from "@mui/material";
import { TfiReload } from "react-icons/tfi";
import CollapsibleTableUI from "@/components/ui/CollapsibleTableUI";
import { columns } from "./Columns";
import InvoiceActions from "./Actions";
import { usePendingInvoices } from "@/context";

import ModalPayment from "./ModalPayment";
import { CollapsibleTableRow } from "@/components/ui/CollapsibleTableUI/types";

const PendingInvoices: React.FC = () => {
  const { getAllInvoices, _invoices } = usePendingInvoices();

  useEffect(() => {
    getAllInvoices();
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
              onClick={getAllInvoices}
              startIcon={<TfiReload />}
            ></Button>
          </Box>
        </Box>
      </Box>

      {/* {JSON.stringify(_openDetailPaymentModal)} */}
      {/* {JSON.stringify(_invoices)} */}

      <CollapsibleTableUI
        columns={columns}
        data={_invoices}
        detailsTitle="Cuotas y Pagos Realizados"
        actions={({ row }: { row: CollapsibleTableRow }) => (
          <InvoiceActions row={row} />
        )}
      />

      <ModalPayment />

    </>
  );
};

export default PendingInvoices;
