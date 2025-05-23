import React, { useState } from "react";
import { Box } from "@mui/material";
import GridMoreVertIcon from "@mui/icons-material/MoreVert";
import ActionsListUI from "@/components/ui/ActionsListUI";
import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import { useUserContext } from "@/context";
import { notifyInfo } from "@/utils/notifications";
import { ErrorHandler } from "@/lib/errors";
import ModalEditEmail from "./ModalEditEmail";

const Actions: React.FC<{
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
}> = ({ params }) => {
  const { updateUser, resendInvitation } = useUserContext();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const actions = [
    {
      title: "Edit email address",
      onClick: () => {
        handleOpenModal();
        console.log(`Edit action for row ${params.id}`);
      },
    },
  ];

  if (params.row.status === "pending" || params.row.status === "cancelled") {
    actions.push({
      title: "Resend Invitation",
      onClick: () => {
        try {
          resendInvitation(params.row.id);
          notifyInfo("Invitation resent successfully");
        } catch (error) {
          ErrorHandler.showError(error, true);
        }
      },
    });
    actions.push({
      title: "Cancel Invitation",
      onClick: async () => {
        try {
          const response = await updateUser(params.row.id, {
            invitationToken: "",
            status: "cancelled",
          });
          if (response) {
            notifyInfo("Invitation cancelled successfully");
          }
        } catch (error) {
          ErrorHandler.showError(error, true);
        }
      },
    });
  }

  if (params.row.status === "active") {
    actions.push({
      title: "Inactive User",
      onClick: async () => {
        try {
          const response = await updateUser(params.row.id, {
            status: "inactive",
          });
          if (response) {
            notifyInfo("User inactivated successfully");
          }
        } catch (error) {
          ErrorHandler.showError(error, true);
        }
      },
    });
  }

  if (params.row.status === "inactive") {
    actions.push({
      title: "Activate User",
      onClick: async () => {
        try {
          const response = await updateUser(params.row.id, {
            status: "active",
          });
          if (response) {
            notifyInfo("User activated successfully");
          }
        } catch (error) {
          ErrorHandler.showError(error, true);
        }
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

      <ModalEditEmail
        open={openModal}
        handleClose={handleCloseModal}
        userId={params.row.id}
        currentEmail={params.row.email}
      />
    </Box>
  );
};

export default Actions;
