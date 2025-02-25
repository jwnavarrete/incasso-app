import { ROLES } from "@/common/lib/constant";
import { FaUsers, FaListAlt, FaHistory, FaEdit } from "react-icons/fa";

const clienteMenu = (t: (key: string) => string) => {
  return [
    {
      id: "4",
      label: t('Clientes.title'),
      Icon: FaUsers,
      roles: [ROLES.TENANT_ADMIN, ROLES.COLLECTIONS_EXECUTIVE],
      children: [
        {
          id: "4.1",
          label: t('Clientes.listadoClientes'),
          Icon: FaListAlt,
          path: "/clientes",
          roles: [ROLES.TENANT_ADMIN, ROLES.COLLECTIONS_EXECUTIVE],
        },
        {
          id: "4.2",
          label: t('Clientes.historialFacturacion'),
          Icon: FaHistory,
          path: "/historial-facturacion",
          roles: [ROLES.TENANT_ADMIN, ROLES.COLLECTIONS_EXECUTIVE],
        },
        {
          id: "4.3",
          label: t('Clientes.actualizarCliente'),
          Icon: FaEdit,
          path: "/actualizar-cliente",
          roles: [ROLES.TENANT_ADMIN, ROLES.COLLECTIONS_EXECUTIVE],
        },
      ],
    },
  ];
};

export default clienteMenu;
