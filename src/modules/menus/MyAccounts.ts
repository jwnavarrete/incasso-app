import { UserRoles } from "@/common/enums/userRoles";
import {
  FaWallet,
  FaFileInvoiceDollar,
  FaCreditCard,
  FaComments,
  FaHistory,
} from "react-icons/fa";

const myAccounts = (t: (key: string) => string) => {
  return [
    {
      id: "9",
      label: "Mis cuentas",
      Icon: FaWallet,
      roles: [UserRoles.DEBTOR],
      children: [
        {
          id: "9.1",
          label: "Ver facturas pendientes",
          Icon: FaFileInvoiceDollar,
          path: "/pending-invoices",
          roles: [UserRoles.DEBTOR],
        },
        {
          id: "9.2",
          label: "Chat Deudor",
          Icon: FaComments,
          path: "/chat-debtor",
          roles: [UserRoles.DEBTOR],
        },
        {
          id: "9.3",
          label: "Historial de pagos",
          Icon: FaHistory,
          path: "/payment-history",
          roles: [UserRoles.DEBTOR],
        },
      ],
    },
  ];
};

export default myAccounts;
