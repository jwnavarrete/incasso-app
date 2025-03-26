import { ROLES } from "@/common/lib/constant";
import {
  FaFileInvoice,
  FaFileImport,
  FaFileUpload,
  FaSearch,
} from "react-icons/fa";

const AccountReceivable = (t: (key: string) => string) => {
  return [
    {
      id: "2",
      label: t("accounts_receivable.title"),
      Icon: FaFileInvoice,
      roles: [ROLES.TENANT_ADMIN, ROLES.COLLECTIONS_EXECUTIVE],
      children: [
        {
          id: "2.1",
          label: t("accounts_receivable.registro"),
          Icon: FaFileImport,
          path: "/accounts-receivable",
          roles: [ROLES.TENANT_ADMIN, ROLES.COLLECTIONS_EXECUTIVE],
        },        
        // {
        //   id: "2.3",
        //   label: t("accounts_receivable.viewInvoices"),
        //   Icon: FaSearch,
        //   path: "/consultar-facturas",
        //   roles: [ROLES.TENANT_ADMIN, ROLES.COLLECTIONS_EXECUTIVE],
        // },
      ],
    },
  ];
};

export default AccountReceivable;
