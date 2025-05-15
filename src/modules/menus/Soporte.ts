import { UserRoles } from "@/common/enums/userRoles";
import { FaQuestionCircle, FaHeadset } from "react-icons/fa";

const soporteMenu = (t: (key: string) => string) => {
  return [
    {
      id: "9",
      label: t("Soporte.title"), // Usamos la función de traducción
      Icon: FaQuestionCircle,
      roles: [UserRoles.TENANT_ADMIN, UserRoles.COLLECTIONS_EXECUTIVE],
      children: [
        {
          id: "9.2",
          label: t("Soporte.technicalSupport"), // Usamos la función de traducción
          Icon: FaHeadset,
          path: "/soporte-tecnico",
          roles: [UserRoles.TENANT_ADMIN, UserRoles.COLLECTIONS_EXECUTIVE],
        },
      ],
    },
  ];
};

export default soporteMenu;
