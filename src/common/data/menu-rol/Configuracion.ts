import { ROLES } from "@/common/lib/constant";
import { FaCog, FaSlidersH, FaUserShield, FaPlug } from "react-icons/fa";

const configuracionMenu = (t: (key: string) => string) => {
  return [
    {
      id: "7",
      label: t('Configuracion.title'), // Usamos la función de traducción
      Icon: FaCog,
      roles: [ROLES.TENANT_ADMIN, ROLES.SUPER_ADMIN],
      children: [
        {
          id: "7.1",
          label: t('Configuracion.parametros'), // Usamos la función de traducción
          Icon: FaSlidersH,
          path: "/parameters",
          roles: [ROLES.TENANT_ADMIN, ROLES.SUPER_ADMIN],
        },
        {
          id: "7.2",
          label: t('Configuracion.usuarios'), // Usamos la función de traducción
          Icon: FaUserShield,
          path: "/users",
          roles: [ROLES.TENANT_ADMIN],
        },
        {
          id: "7.3",
          label: t('Configuracion.conexionApi'), // Usamos la función de traducción
          Icon: FaPlug,
          path: "/conexion-api",
          roles: [ROLES.TENANT_ADMIN],
        },
      ],
    },
  ];
};

export default configuracionMenu;
