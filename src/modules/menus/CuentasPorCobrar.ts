import { UserRoles } from "@/common/enums/userRoles";
import {
  FaFileInvoice,
  FaFileImport,
  FaComments,
} from "react-icons/fa";

const AccountReceivable = (t: (key: string) => string) => {
  return [
    {
      id: "2",
      label: t("accounts_receivable.title"),
      Icon: FaFileInvoice,
      roles: [UserRoles.TENANT_ADMIN, UserRoles.COLLECTIONS_EXECUTIVE],
      children: [
        {
          id: "2.1",
          label: t("accounts_receivable.registro"),
          Icon: FaFileImport,
          path: "/accounts-receivable",
          roles: [UserRoles.TENANT_ADMIN, UserRoles.COLLECTIONS_EXECUTIVE],
        },
        {
          id: "2.2",
          label: "Chat Deudor",
          Icon: FaComments,
          path: "/chat-debtor",
          roles: [UserRoles.TENANT_ADMIN, UserRoles.COLLECTIONS_EXECUTIVE],
        },
      ],
    },
  ];
};

export default AccountReceivable;
