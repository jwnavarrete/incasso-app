import { UserRoles } from "@/common/enums/userRoles";
import { FaChartBar, FaChartLine } from "react-icons/fa";

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
      ],
    },
  ];
};

export default reporteMenu;
