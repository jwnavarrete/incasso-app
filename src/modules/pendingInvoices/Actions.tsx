// components/InvoiceActions.tsx
"use client";
import { usePendingInvoices } from "./PendingInvoicesContext";
import ActionsListUI from "@/common/components/ui/ActionsListUI";
import { GridMoreVertIcon } from "@mui/x-data-grid";

const InvoiceActions = ({ row }: { row: any }) => {
    const { openPendingModal } = usePendingInvoices();

    const handleRegisterPayment = () => {
        openPendingModal(row);
    };

    const actionsList = [
        {
            title: "Register Payment",
            onClick: handleRegisterPayment,
        },
    ];

    return (
        <ActionsListUI
            buttonIcon={<GridMoreVertIcon />}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            actions={actionsList}
        />
    );
};

export default InvoiceActions;
