"use client";
import React, { createContext, useContext, useState, ReactNode, useMemo, use } from "react";
import api from "@/lib/axiosInstance";
import { AccountsReceivableInvoice } from "@/common/types/account-receivable/invoice";
import { PaymentDetails, RegisterPaymentAgreement } from "@/common/types/account-receivable/payment";

interface PendingInvoicesContextType {
  _selectedInvoice: AccountsReceivableInvoice | null;
  _openPaymentModal: boolean;
  openPendingModal: (invoice: AccountsReceivableInvoice) => void;
  closePendingModal: () => void;
  getAllInvoices: () => Promise<void>;
  registerPayment: (payload: PaymentDetails) => Promise<boolean>;
  registerPaymentAgreement: (payload: RegisterPaymentAgreement) => Promise<boolean>;
  _invoices: AccountsReceivableInvoice[];
}

const PendingInvoicesContext = createContext<PendingInvoicesContextType | undefined>(undefined);

interface PendingInvoicesProps {
  children: ReactNode;
}

export const PendingInvoicesProvider: React.FC<PendingInvoicesProps> = ({ children }: { children: ReactNode }) => {
  const [_invoices, setInvoices] = useState<AccountsReceivableInvoice[]>([]);

  const [_selectedInvoice, setSelectedInvoice] = useState<AccountsReceivableInvoice | null>(null);
  const [_openPaymentModal, setOpenPaymentModal] = useState(false);

  const openPendingModal = (invoice: AccountsReceivableInvoice) => {
    console.log("Selected invoice:", invoice);
    setSelectedInvoice(invoice);
    setOpenPaymentModal(true);
  };

  const closePendingModal = () => {
    setSelectedInvoice(null);
    setOpenPaymentModal(false);
  };


  const getAllInvoices = async () => {
    try {
      const response = await api.get("/accounts-receivable/by-user");
      console.log(`response`, response.data.invoices);
      setInvoices(response.data.invoices);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const registerPayment = async (payload: PaymentDetails) => {
    try {
      const response = await api.post("/payments/register-payment", payload);
      console.log("Payment registered:", response);
      if (response.status === 201) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error registering payment:", error);
      return false;
    }
  }

  const registerPaymentAgreement = async (payload: RegisterPaymentAgreement) => {
    try {
      const response = await api.post("/payments/register-payment-agreement", payload);
      console.log("Payment registered:", response);
      if (response.status === 201) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error registering payment:", error);
      return false;
    }
  }

  const contextValue = useMemo(
    () => ({
      _selectedInvoice,
      _openPaymentModal,
      _invoices,
      openPendingModal,
      closePendingModal,
      getAllInvoices,
      registerPayment,
      registerPaymentAgreement
    }),
    [_invoices, _selectedInvoice, _openPaymentModal]
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
