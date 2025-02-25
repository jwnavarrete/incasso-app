import { ROLES } from "@/common/lib/constant";
import { FaChartBar, FaChartLine } from "react-icons/fa";

const reporteMenu = (t: (key: string) => string) => {
  return [
    {
      id: "6",
      label: t("Reportes.title"),
      Icon: FaChartBar,
      roles: [ROLES.TENANT_ADMIN],
      children: [
        {
          id: "6.1",
          label: t("Reportes.reporteCobranzas"),
          Icon: FaChartLine,
          path: "/reporte-cobranzas",
          roles: [ROLES.TENANT_ADMIN],
        },
      ],
    },
  ];
};

export default reporteMenu;
