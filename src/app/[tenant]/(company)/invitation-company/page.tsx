import InvoiceComponent from "./components";
import React from "react";
import { PendingInvoicesProvider } from "@/context";


const RegisterPage: React.FC = () => {
  return (
    <PendingInvoicesProvider>
      <InvoiceComponent />
    </PendingInvoicesProvider>
    // </UserProvider>
  );
};

export default RegisterPage;
