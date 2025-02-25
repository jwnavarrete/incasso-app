import { ROLES } from "@/common/lib/constant";
import {
  FaFileInvoice,
  FaFileImport,
  FaFileUpload,
  FaSearch,
} from "react-icons/fa";

const FacturaMenu = (t: (key: string) => string) => {
  return [
    {
      id: "2",
      label: t("facturas.title"),
      Icon: FaFileInvoice,
      roles: [ROLES.TENANT_ADMIN, ROLES.COLLECTIONS_EXECUTIVE],
      children: [
        {
          id: "2.1",
          label: t("facturas.importarFacturasMasivas"),
          Icon: FaFileImport,
          path: "/importar-facturas-masivas",
          roles: [ROLES.TENANT_ADMIN, ROLES.COLLECTIONS_EXECUTIVE],
        },
        {
          id: "2.2",
          label: t("facturas.importarFacturaIndividual"),
          Icon: FaFileUpload,
          path: "/importar-factura-individual",
          roles: [ROLES.TENANT_ADMIN, ROLES.COLLECTIONS_EXECUTIVE],
        },
        {
          id: "2.3",
          label: t("facturas.consultarFacturas"),
          Icon: FaSearch,
          path: "/consultar-facturas",
          roles: [ROLES.TENANT_ADMIN, ROLES.COLLECTIONS_EXECUTIVE],
        },
      ],
    },
  ];
};

export default FacturaMenu;
