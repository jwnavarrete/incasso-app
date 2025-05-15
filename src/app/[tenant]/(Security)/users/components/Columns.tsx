import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Actions from "./Actions";
import { SelectRole } from "./SelectRole";
import { roles } from "./roles";
import { renderCollectionStatus } from "@/components/ui/RenderStatus";


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

export const columns: GridColDef[] = [
  {
    field: "fullname",
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
            {params.value ? params.value.charAt(0).toUpperCase() : ""}
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
      return <SelectRole params={params} roles={roles} />;
    },
  },
  {
    field: "status",
    headerName: "Status",
    flex: 0.5,
    minWidth: 100,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => renderCollectionStatus(params.value as any),
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
            {params.value?.fullname}
          </Typography>
        </Box>
      );
    },
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
