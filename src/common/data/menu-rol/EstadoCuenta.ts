import { ROLES } from "@/common/lib/constant";
import { FaWallet, FaUserAlt, FaUsersCog } from "react-icons/fa";

const estadoCuentaMenu = (t: (key: string) => string) => {
  return [
    {
      id: "5",
      label: t('EstadoCuenta.title'),
      Icon: FaWallet,
      roles: [ROLES.TENANT_ADMIN, ROLES.COLLECTIONS_EXECUTIVE],
      children: [
        {
          id: "5.1",
          label: t('EstadoCuenta.estadoCuentasPorCliente'),
          Icon: FaUserAlt,
          path: "/estado-cuentas-cliente",
          roles: [ROLES.TENANT_ADMIN, ROLES.COLLECTIONS_EXECUTIVE],
        },
        {
          id: "5.2",
          label: t('EstadoCuenta.estadoCuentasGeneral'),
          Icon: FaUsersCog,
          path: "/estado-cuentas-general",
          roles: [ROLES.TENANT_ADMIN],
        },
      ],
    },
  ];
};

export default estadoCuentaMenu;
