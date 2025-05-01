import { ROLES } from "@/common/lib/constant";
import {
  FaWallet,
  FaFileInvoiceDollar,
  FaCreditCard,
  FaHistory,
} from "react-icons/fa";

const myAccounts = (t: (key: string) => string) => {
  return [
    {
      id: "9",
      label: "Mis cuentas",
      Icon: FaWallet,
      roles: [ROLES.DEBTOR],
      children: [
        {
          id: "9.1",
          label: "Ver facturas pendientes",
          Icon: FaFileInvoiceDollar,
          path: "/pending-invoices",
          roles: [ROLES.DEBTOR],
        },
        // {
        //   id: "9.2",
        //   label: "Realizar pago",
        //   Icon: FaCreditCard,
        //   path: "/make-payment",
        //   roles: [ROLES.DEBTOR],
        // },
        {
          id: "9.3",
          label: "Historial de pagos",
          Icon: FaHistory,
          path: "/payment-history",
          roles: [ROLES.DEBTOR],
        },
      ],
    },
  ];
};

export default myAccounts;
