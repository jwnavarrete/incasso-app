'use client';
import PendingInvoices from "@/modules/pendingInvoices";
import { PendingInvoicesProvider } from "@/modules/pendingInvoices/PendingInvoicesContext";
import React from "react";

const InvoicePendingPage: React.FC = () => {
  return (
    <PendingInvoicesProvider>
      <PendingInvoices />
    </PendingInvoicesProvider>
  );
};

export default InvoicePendingPage;
