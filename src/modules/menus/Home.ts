import { UserRoles } from "@/common/enums/userRoles";
import { FaHome } from "react-icons/fa";

const HomeMenu = (t: (key: string) => string) => {
  return [
    {
      id: "1",
      label: t('inicio'), // Usamos la función de traducción
      Icon: FaHome,
      path: "/",
      roles: [UserRoles.TENANT_ADMIN, UserRoles.COLLECTIONS_EXECUTIVE, UserRoles.SUPER_ADMIN, UserRoles.DEBTOR],
    },
  ];
};

export default HomeMenu;