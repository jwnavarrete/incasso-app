import React from "react";
import { Box } from "@mui/material";
import GridMoreVertIcon from "@mui/icons-material/MoreVert";
import ActionsListUI from "@/common/components/ui/ActionsListUI";
import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";

const Actions: React.FC<{
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
}> = ({ params }) => {
  const actions = [
    {
      title: "Edit email address",
      onClick: () => {
        console.log(`Edit action for row ${params.id}`);
      },
    },
  ];

  if (params.row.status === "Pending") {
    actions.push({
      title: "Resend Invitation",
      onClick: () => {
        console.log(`Resend invitation for row ${params.id}`);
      },
    });
    actions.push({
      title: "Cancel Invitation",
      onClick: () => {
        console.log(`Cancel invitation for row ${params.id}`);
      },
    });
  }

  if (params.row.status === "Active") {
    actions.push({
      title: "Inactive User",
      onClick: () => {
        console.log(`Delete action for row ${params.id}`);
      },
    });
  }

  if (params.row.status === "Inactive") {
    actions.push({
      title: "Activate User",
      onClick: () => {
        console.log(`Delete action for row ${params.id}`);
      },
    });
  }

  return (
    <Box>
      <ActionsListUI
        buttonIcon={<GridMoreVertIcon />}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        actions={actions}
      />
    </Box>
  );
};

export default Actions;
