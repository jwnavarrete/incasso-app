import { ROLES } from "@/common/lib/constant";
import {
  FaCashRegister,
  FaRegClock,
  FaMoneyCheckAlt,
  FaPlusCircle,  
} from "react-icons/fa";

const CobranzaMenu = (t: (key: string) => string) => {
  return [
    {
      id: "3",
      label: t("Cobranzas.title"),
      Icon: FaCashRegister,
      roles: [ROLES.TENANT_ADMIN, ROLES.COLLECTIONS_EXECUTIVE],
      children: [
        {
          id: "3.1",
          label: t("Cobranzas.cobrosPendientes"),
          Icon: FaRegClock,
          path: "/cobros-pendientes",
          roles: [ROLES.TENANT_ADMIN, ROLES.COLLECTIONS_EXECUTIVE],
        },
        {
          id: "3.2",
          label: t("Cobranzas.cobrosRealizados"),
          Icon: FaMoneyCheckAlt,
          path: "/cobros-realizados",
          roles: [ROLES.TENANT_ADMIN, ROLES.COLLECTIONS_EXECUTIVE],
        },
        {
          id: "3.3",
          label: t("Cobranzas.registrarCobro"),
          Icon: FaPlusCircle,
          path: "/registrar-cobro",
          roles: [ROLES.TENANT_ADMIN, ROLES.COLLECTIONS_EXECUTIVE],
        },
      ],
    },
  ];
};

export default CobranzaMenu;
