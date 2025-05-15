// components/InvoiceActions.tsx
"use client";
import { useState } from "react";
import { usePendingInvoices } from "@/context";
import ActionsListUI from "@/components/ui/ActionsListUI";
import { GridMoreVertIcon } from "@mui/x-data-grid";
import ModalInvoice from "./ModalInvoice";
import { Button } from "@mui/material";
import { FaDollarSign } from "react-icons/fa"; // Cambiado el ícono

const InvoiceActions = ({ row }: { row: any }) => {
    const { openPendingModal } = usePendingInvoices();
    const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);

    const actionsList = [];

    const handleRegisterPayment = () => {
        openPendingModal(row);
    };

    const handleViewDetails = () => {
        setIsViewDetailsModalOpen(true);
    };

    if (row.receivableStatus === 'pending') {
        actionsList.push({
            title: "Register Payment",
            onClick: handleRegisterPayment,
        });
    }

    // Add the "View Details" action
    actionsList.push({
        title: "View Details",
        onClick: handleViewDetails,
    });

    return (
        <>
            {row.receivableStatus === 'pending' && (
                <Button
                    onClick={handleRegisterPayment}
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ textTransform: "none" }}
                >
                    <FaDollarSign /> Pay
                </Button>
            )}
            {/* <ActionsListUI
                buttonIcon={<GridMoreVertIcon />}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                actions={actionsList}
            /> */}

            <ModalInvoice isOpen={isViewDetailsModalOpen} row={row} onClose={() => setIsViewDetailsModalOpen(false)} />
        </>
    );
};

export default InvoiceActions;
