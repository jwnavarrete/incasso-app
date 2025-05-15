import React, { useState } from "react";
import { Box } from "@mui/material";
import GridMoreVertIcon from "@mui/icons-material/MoreVert";
import ActionsListUI from "@/components/ui/ActionsListUI";
import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import { notifyInfo } from "@/utils/notifications";
import { ErrorHandler } from "@/lib/errors";
import api from "@/lib/axiosInstance";
import ModalNew from "./ModalNew";
import ModalPaymentAgreement from "./ModalPaymentAgreement";
import { AccountsReceivableInvoice } from "@/common/types/account-receivable/invoice";

const Actions: React.FC<{
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
}> = ({ params }) => {
  const [open, setOpen] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<AccountsReceivableInvoice>();
  const [openModalPaymentAgreement, setOpenModalPaymentAgreement] = useState(false);

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleOpenModalPaymentAgreement = () => {
    setOpenModalPaymentAgreement(true);
  };
  const handleCloseModalPaymentAgreement = () => {
    setOpenModalPaymentAgreement(false);
  };

  const handleSendNotification = (id: string) => {
    api
      .post(`/accounts-receivable/${id}/send-notification`)
      .then((response) => {
        console.log("Invoices fetched successfully:", response.data);
        notifyInfo("Notification sent successfully");
      })
      .catch((error) => {
        console.error("Error fetching invoices:", error);
      });
  };

  const actions = [
    {
      title: "Resend Notification",
      onClick: () => {
        handleSendNotification(params.row.id);
        console.log(`Edit action for row ${params.id}`);
      },
    },
  ];

  actions.push({
    title: "Show Details",
    onClick: () => {
      try {
        setCurrentInvoice(params.row);
        handleOpenModal()
        // resendInvitation(params.row.id);
      } catch (error) {
        ErrorHandler.showError(error, true);
      }
    },
  });

  if (params.row.status === "pending" || params.row.status === "cancelled") {
    actions.push({
      title: "Resend Invitation",
      onClick: () => {
        try {
          // resendInvitation(params.row.id);
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
          // const response = await updateUser(params.row.id, {
          //   invitationToken: "",
          //   status: "cancelled",
          // });
          // if (response) {
          //   notifyInfo("Invitation cancelled successfully");
          // }
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
          // const response = await updateUser(params.row.id, {
          //   status: "inactive",
          // });
          // if (response) {
          //   notifyInfo("User inactivated successfully");
          // }
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
          // const response = await updateUser(params.row.id, {
          //   status: "active",
          // });
          // if (response) {
          //   notifyInfo("User activated successfully");
          // }
        } catch (error) {
          ErrorHandler.showError(error, true);
        }
      },
    });
  }

  if ((params.row.collectionStatus === "aanmaning"
    || params.row.collectionStatus === "ingebrekestelling")
    || params.row.hasPaymentAgreement === true
  ) {
    actions.push({
      title: "Payment Agreement",
      onClick: () => {
        try {
          setCurrentInvoice(params.row);
          handleOpenModalPaymentAgreement();
          // resendInvitation(params.row.id);
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

      <ModalNew
        open={open}
        onClose={handleCloseModal}
        onSave={handleCloseModal}
        invoice={currentInvoice}
      />

      <ModalPaymentAgreement open={openModalPaymentAgreement} onClose={handleCloseModalPaymentAgreement} invoice={currentInvoice} />
    </Box>
  );
};

export default Actions;
