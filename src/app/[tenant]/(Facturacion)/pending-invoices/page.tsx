'use client';
import PendingInvoices from "./components";
import { PendingInvoicesProvider } from "@/context";
import React from "react";

const InvoicePendingPage: React.FC = () => {
  return (
    <PendingInvoicesProvider>
      <PendingInvoices />
    </PendingInvoicesProvider>
  );
};

export default InvoicePendingPage;
