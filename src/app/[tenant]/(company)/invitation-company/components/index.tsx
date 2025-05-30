"use client";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { getColumns } from "./Columns";
import CustomizedDataGridUI from "@/components/ui/CustomizedDataGridUI";
import api from "@/lib/axiosInstance";
import { useEffect } from "react";
import ModalNew from "./ModalNew";
import { TfiReload } from "react-icons/tfi";
import { ICollectionParameters, AccountsReceivableInvoice } from "@/common/types/account-receivable/invoice"
import { InvitationCompany } from "@/common/types/invite-company/invite";

const InvoiceComponent: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [invitationData, setInvitationData] = useState<InvitationCompany[]>([]);
  const [currentInvite, setCurrentInvite] = useState<InvitationCompany>();

  useEffect(() => {
    handleGetAllInvitation();
  }, []);

  const handleGetAllInvitation = () => {
    console.log("Fetching invitationes...");
    api
      .get("/company/invite")
      .then((response) => {
        console.log("Invoices fetched successfully:", response.data);
        setInvitationData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching invoices:", error);
      });
  };

  const handleOpenNewInvoiceModal = () => {
    setCurrentInvite(undefined);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    handleGetAllInvitation();
  };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ textAlign: "left" }}>
          <h2 style={{ display: "inline", marginRight: "10px" }}>
            Invitaciones de Empresas
          </h2>
          <Button
            variant="text"
            color="primary"
            size="small"
            onClick={handleGetAllInvitation}
            startIcon={<TfiReload />}
          ></Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleOpenNewInvoiceModal}
            sx={{ ml: 1 }}
          >
            Nueva Invitación
          </Button>
        </Box>
      </Box>

      <ModalNew
        open={open}
        onClose={handleCloseModal}
        onSave={handleCloseModal}
        invite={currentInvite} // Pass the current invoice if available
      />

      <Grid sx={{ mt: 2 }}>
        <CustomizedDataGridUI
          rows={invitationData}
          refresh={handleGetAllInvitation}
          columns={getColumns(
            (invite) => {
              setCurrentInvite(invite);
              setOpen(true);
            },
            handleGetAllInvitation
          )}
        />
      </Grid>
    </Box>
  );
};

export default InvoiceComponent;