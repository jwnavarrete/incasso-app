import { UserRoles } from "@/common/enums/userRoles";
import { FaChartBar, FaChartLine, FaWallet } from "react-icons/fa";

const reporteMenu = (t: (key: string) => string) => {
  return [
    {
      id: "6",
      label: t("Reportes.title"),
      Icon: FaChartBar,
      roles: [UserRoles.TENANT_ADMIN],
      children: [
        {
          id: "6.1",
          label: t("Reportes.reporteCobranzas"),
          Icon: FaChartLine,
          path: "/reporte-cobranzas",
          roles: [UserRoles.TENANT_ADMIN],
        },
        {
          id: "6.2",
          label: 'Estado de Cuentas',
          Icon: FaWallet,
          path: "/estado-cuentas-cliente",
          roles: [UserRoles.TENANT_ADMIN, UserRoles.COLLECTIONS_EXECUTIVE],
        },
      ],
    },
  ];
};

export default reporteMenu;
