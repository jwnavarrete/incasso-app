import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Actions from "./Actions";

function renderStatus(
  status: "aanmaning" | "ingebrekestelling" | "sommatie" | "blokkade"
) {
  const colors: { [index: string]: "success" | "error" | "info" | "warning" } =
    {
      aanmaning: "success",
      sommatie: "info",
      ingebrekestelling: "warning",
      blokkade: "error",
    };

  return <Chip label={status} color={colors[status]} size="small" />;
}

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
    headerName: "Impuestos",
    flex: 1.5,
    minWidth: 150,
    align: "right",
    renderCell(params) {
      const collectionPercentage = params.row.collectionPercentage || 0;
      const abbPercentage = params.row.abbPercentage || 0;
      const baseCollection =
        (params.row.invoiceAmount * collectionPercentage) / 100;
      const baseAbb = (params.row.invoiceAmount * abbPercentage) / 100;
      const impuestos = baseCollection + baseAbb;

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
            {formatCurrency(Number(impuestos))}
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
      const collectionPercentage = params.row.collectionPercentage || 0;
      const abbPercentage = params.row.abbPercentage || 0;
      const baseCollection =
        (params.row.invoiceAmount * collectionPercentage) / 100;
      const baseAbb = (params.row.invoiceAmount * abbPercentage) / 100;
      const impuestos = baseCollection + baseAbb;
      const total = (params.row.invoiceAmount + impuestos).toFixed(2);

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
  // {
  //   field: "receivableStatus",
  //   headerName: "Status",
  //   flex: 0.5,
  //   minWidth: 150,
  //   align: "center",
  //   headerAlign: "center",
  //   renderCell: (params) => renderStatus(params.value as any),
  // },
  {
    field: "collectionStatus",
    headerName: "Status",
    flex: 0.5,
    minWidth: 150,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => renderStatus(params.value as any),
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
