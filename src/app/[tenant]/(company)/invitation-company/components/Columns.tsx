import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Chip } from "@mui/material";
import Actions from "./Actions";


export const getColumns = (
  onEdit: (invite: any) => void,
  onRefresh: () => void
): GridColDef[] => [

    {
      field: "invitedCompany",
      headerName: "Nombre Empresa",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 40,
    },
    {
      field: "invitedEmail",
      headerName: "Email Empresa",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "country",
      headerName: "País",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 40,
    },

    {
      field: "sentAt",
      headerName: "Fecha Envío",
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
      field: "acceptedAt",
      headerName: "Fecha Aceptación",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 40,
      renderCell: (params) => {
        const date = params.value
          ? new Date(params.value).toLocaleDateString()
          : "";
        return date;
      }
    },
    {
      field: "expiresAt",
      headerName: "Fecha Expiración",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 40,
      renderCell: (params) => {
        const date = params.value
          ? new Date(params.value).toLocaleDateString()
          : "";
        return date;
      }
    },
    {
      field: "status",
      headerName: "Estado",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 40,
      renderCell: (cellValues) => {
        let label = "";
        let color: "warning" | "success" | "error" | "default" = "default";
        switch (cellValues.value) {
          case "PENDING":
            label = "Pendiente";
            color = "default";
            break;
          case "ACCEPTED":
            label = "Aceptado";
            color = "success";
            break;
          case "EXPIRED":
            label = "Expirado";
            color = "error";
            break;
          case "CANCELLED":
            label = "Cancelado";
            color = "error";
            break;
          default:
            label = cellValues.value;
        }

        return (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Chip label={label} color={color} variant="filled" size="small" />
          </Box>
        );
      }
    },

    {
      field: "id",
      headerName: "Acción",
      flex: 0.5,
      minWidth: 50,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Actions params={params} onEdit={onEdit} onRefresh={onRefresh} />
        </Box>
      ),
    },

  ];
