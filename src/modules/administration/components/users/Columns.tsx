import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { GridCellParams, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Actions from "./Actions";
import SelectOptionUI from "@/common/components/ui/SelectOptionUI";

function renderStatus(status: "Active" | "Pending" | "Inactive") {
  const colors: { [index: string]: "success" | "error" | "info" } = {
    Active: "success",
    Pending: "info",
    Inactive: "error",
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}

export function renderAvatar(
  params: GridCellParams<{ name: string; color: string }, any, any>
) {
  if (params.value == null) {
    return "";
  }

  return (
    <Avatar
      sx={{
        backgroundColor: params.value.color,
        width: "24px",
        height: "24px",
        fontSize: "0.85rem",
      }}
    >
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}

const roles = [
  { value: "1", description: "Administrator" },
  { value: "2", description: "Collection Executive" },
];

export const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1.5,
    minWidth: 200,
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
          <Avatar
            sx={{
              width: "24px",
              height: "24px",
              fontSize: "0.85rem",
            }}
          >
            {params.value.charAt(0).toUpperCase()}
          </Avatar>

          <Box sx={{ marginLeft: 1 }}>
            <Typography variant="body2">{params.value}</Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1.5,
    minWidth: 200,
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
    field: "role",
    headerName: "Role",
    flex: 1,
    minWidth: 250,
    align: "center",
    headerAlign: "center",
    renderCell(params) {
      return (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <SelectOptionUI
            value={params.value}
            options={roles}
            onChange={(value) => {
              console.log(`Role changed to: ${value}`);
            }}
            label=""
          />
        </Box>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    flex: 0.5,
    minWidth: 90,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => renderStatus(params.value as any),
  },
  {
    field: "joined",
    headerName: "Joined",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "invitedBy",
    headerName: "Invited By",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "lastActive",
    headerName: "Last Active",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 100,
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
          <Actions params={params} />;
        </Box>
      );
    },
  },
];

