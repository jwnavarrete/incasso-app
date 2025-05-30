import { UserRoles } from "@/common/enums/userRoles";
import { FaBuilding, FaUserPlus } from "react-icons/fa";

const empresasMenu = (t: (key: string) => string) => {
  return [
    {
      id: "10",
      label: t("Empresas.title"),
      Icon: FaBuilding,
      roles: [UserRoles.TENANT_ADMIN, UserRoles.SUPER_ADMIN],
      children: [
        {
          id: "10.2",
          label: t("Invitar empresas"),
          Icon: FaUserPlus,
          path: "/invitation-company",
          roles: [UserRoles.TENANT_ADMIN, UserRoles.SUPER_ADMIN],
        },
      ],
    },
  ];
};

export default empresasMenu;
