import React, { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import GridMoreVertIcon from "@mui/icons-material/MoreVert";
import ActionsListUI from "@/components/ui/ActionsListUI";
import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import { ErrorHandler } from "@/lib/errors";
import api from "@/lib/axiosInstance";

const Actions: React.FC<{
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  onEdit: (invite: any) => void;
  onRefresh: () => void;
}> = ({ params, onEdit, onRefresh }) => {

  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const status = params.row.status;
  const actions: { title: string; onClick: () => void }[] = [];

  const handleCancelInvitation = async (id: string) => {
    setLoadingAction("cancel");
    try {
      await api.patch(`/company/invite/${id}/cancel`);
      onRefresh()
      console.log("Invitación cancelada");

    } catch (error) {
      ErrorHandler.showError(error, true);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleResendInvitation = async (id: string) => {
    setLoadingAction("resend");
    try {
      await api.post(`/company/invite/${id}/resend`);
      onRefresh()
      console.log("Invitación reenviada");
    } catch (error) {
      ErrorHandler.showError(error, true);
    } finally {
      setLoadingAction(null);
    }
  };



  if (["PENDING", "EXPIRED"].includes(status)) {
    actions.push({
      title: loadingAction === "resend" ? "Reenviando..." : "Reenviar invitación",
      onClick: () => handleResendInvitation(params.row.id),
    });
  }

  if (status === "PENDING") {
    actions.push({
      title: loadingAction === "cancel" ? "Cancelando..." : "Cancelar invitación",
      onClick: () => handleCancelInvitation(params.row.id),
    });
  }

  return (
    <Box>
      <ActionsListUI
        buttonIcon={
          loadingAction ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <GridMoreVertIcon />
          )
        }
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        actions={actions}
      />
    </Box>
  );
};

export default Actions;
