"use client";
import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";

type Invoice = any;

interface PendingInvoicesContextType {
  _selectedInvoice: Invoice | null;
  _openPaymentModal: boolean;
  openPendingModal: (invoice: Invoice) => void;
  closePendingModal: () => void;
}

const PendingInvoicesContext = createContext<PendingInvoicesContextType | undefined>(undefined);

export const PendingInvoicesProvider = ({ children }: { children: ReactNode }) => {
  const [_selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [_openPaymentModal, setOpenPaymentModal] = useState(false);

  const openPendingModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setOpenPaymentModal(true);
  };

  const closePendingModal = () => {
    setSelectedInvoice(null);
    setOpenPaymentModal(false);
  };

  const contextValue = useMemo(
    () => ({
      _selectedInvoice,
      _openPaymentModal,
      openPendingModal,
      closePendingModal,
    }),
    [_selectedInvoice, _openPaymentModal]
  );

  return (
    <PendingInvoicesContext.Provider value={contextValue}>
      {children}
    </PendingInvoicesContext.Provider>
  );
};

export const usePendingInvoices = (): PendingInvoicesContextType => {
  const context = useContext(PendingInvoicesContext);
  if (!context) {
    throw new Error("usePendingInvoices must be used within a PendingInvoicesProvider");
  }
  return context;
};
