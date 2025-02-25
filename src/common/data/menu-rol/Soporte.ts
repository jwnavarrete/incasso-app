import { ROLES } from "@/common/lib/constant";
import { FaQuestionCircle, FaHeadset } from "react-icons/fa";

const soporteMenu = (t: (key: string) => string) => {
  return [
    {
      id: "9",
      label: t("Soporte.title"), // Usamos la función de traducción
      Icon: FaQuestionCircle,
      roles: [ROLES.TENANT_ADMIN, ROLES.COLLECTIONS_EXECUTIVE],
      children: [
        {
          id: "9.2",
          label: t("Soporte.technicalSupport"), // Usamos la función de traducción
          Icon: FaHeadset,
          path: "/soporte-tecnico",
          roles: [ROLES.TENANT_ADMIN, ROLES.COLLECTIONS_EXECUTIVE],
        },
      ],
    },
  ];
};

export default soporteMenu;
