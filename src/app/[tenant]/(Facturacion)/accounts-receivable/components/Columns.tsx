import * as React from "react";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Actions from "./Actions";
import { renderCollectionStatus } from "@/components/ui/RenderStatus";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export const columns: GridColDef[] = [
  {
    field: "debtor",
    headerName: "Nombre",
    flex: 1.5,
    minWidth: 150,
    align: "left",
    renderCell(params) {
      return (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography variant="body2" noWrap>
            {params.row.debtor?.fullname}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "invoiceNumber",
    headerName: "Factura",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 40,
  },
  {
    field: "dueDate",
    headerName: "Fecha",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 40,
    renderCell: (params) => {
      const date = params.value
        ? new Date(params.value).toLocaleDateString()
        : "";
      return date;
    },
  },
  {
    field: "invoiceAmount",
    headerName: "Monto Factura",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 40,
    renderCell(params) {
      return (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography variant="body2" noWrap>
            {formatCurrency(Number(params.value))}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "impuestos",
    headerName: "Fees",
    flex: 1.5,
    minWidth: 150,
    align: "right",
    renderCell(params) {
      const collectionPercentage = params.row.clientCollectionAmount;
      const baseAbb = params.row.clientAbbAmount;
      const fees = collectionPercentage + baseAbb;

      return (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography variant="body2" noWrap>
            {/* {impuestos.toFixed(2)} */}
            {formatCurrency(Number(fees))}
          </Typography> 
        </Box>
      );
    },
  },
  {
    field: "outstandingBalance",
    headerName: "Total",
    flex: 1.5,
    minWidth: 150,
    align: "left",
    renderCell(params) {
      const collectionPercentage = params.row.clientCollectionAmount;
      const baseAbb = params.row.clientAbbAmount;
      const fees = collectionPercentage + baseAbb;

      const total = (params.row.invoiceAmount + fees).toFixed(2);

      return (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography variant="body2" noWrap>
            {formatCurrency(Number(total))}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "collectionStatus",
    headerName: "Status",
    flex: 0.5,
    minWidth: 150,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => renderCollectionStatus(params.value as any),
  },

  {
    field: "id",
    headerName: "",
    flex: 0.5,
    minWidth: 50,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Actions params={params} />
        </Box>
      );
    },
  },
];
