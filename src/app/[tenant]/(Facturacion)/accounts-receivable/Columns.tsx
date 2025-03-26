import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Actions from "./Actions";

function renderStatus(status: "Aammaning" | "Ingebre" | "inactive" | "cancelled") {
  const colors: { [index: string]: "success" | "error" | "info" | "warning" } =
    {
      Aammaning: "success",
      Sommatie: "info",
      Ingebrekestelling: "warning",
      Blokkade: "error",
    };

  return <Chip label={status} color={colors[status]} size="small" />;
}

export const columns: GridColDef[] = [
  {
    field: "name",
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
            {params.value}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "date",
    headerName: "Fecha",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 40,
  },
  {
    field: "total",
    headerName: "Total",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 40,
  },
  {
    field: "status",
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
