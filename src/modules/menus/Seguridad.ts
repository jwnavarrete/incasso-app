import { UserRoles } from "@/common/enums/userRoles";
import {
  FaShieldAlt,
  FaDatabase,
  FaLock,
  FaClipboardList,
} from "react-icons/fa";

const SeguridadMenu = (t: (key: string) => string) => {
  return [
    {
      id: "8",
      label: t('Seguridad.title'), // Usamos la función de traducción
      Icon: FaShieldAlt,
      roles: [UserRoles.TENANT_ADMIN],
      children: [
        {
          id: "8.1",
          label: t('Seguridad.respaldoDatos'), // Usamos la función de traducción
          Icon: FaDatabase,
          path: "/respaldo-datos",
          roles: [UserRoles.TENANT_ADMIN],
        },
        {
          id: "8.2",
          label: t('Seguridad.controlAcceso'), // Usamos la función de traducción
          Icon: FaLock,
          path: "/control-acceso",
          roles: [UserRoles.TENANT_ADMIN],
        },
        {
          id: "8.3",
          label: t('Seguridad.auditoria'), // Usamos la función de traducción
          Icon: FaClipboardList,
          path: "/auditoria",
          roles: [UserRoles.TENANT_ADMIN],
        },
      ],
    },
  ];
};

export default SeguridadMenu;
