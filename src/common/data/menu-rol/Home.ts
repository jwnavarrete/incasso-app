import { ROLES } from "@/common/lib/constant";
import { FaHome } from "react-icons/fa";

const HomeMenu = (t: (key: string) => string) => {
  return [
    {
      id: "1",
      label: t('inicio'), // Usamos la función de traducción
      Icon: FaHome,
      path: "/",
      roles: [ROLES.TENANT_ADMIN, ROLES.COLLECTIONS_EXECUTIVE, ROLES.SUPER_ADMIN, ROLES.DEBTOR],
    },
  ];
};

export default HomeMenu;