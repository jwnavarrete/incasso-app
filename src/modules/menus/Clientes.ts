import { UserRoles } from "@/common/enums/userRoles";
import { FaUsers, FaListAlt, FaHistory, FaEdit } from "react-icons/fa";

const clienteMenu = (t: (key: string) => string) => {
  return [
    {
      id: "4",
      label: t('Clientes.title'),
      Icon: FaUsers,
      roles: [UserRoles.TENANT_ADMIN, UserRoles.COLLECTIONS_EXECUTIVE],
      children: [
        {
          id: "4.1",
          label: t('Clientes.listadoClientes'),
          Icon: FaListAlt,
          path: "/clientes",
          roles: [UserRoles.TENANT_ADMIN, UserRoles.COLLECTIONS_EXECUTIVE],
        },
        {
          id: "4.2",
          label: t('Clientes.historialFacturacion'),
          Icon: FaHistory,
          path: "/historial-facturacion",
          roles: [UserRoles.TENANT_ADMIN, UserRoles.COLLECTIONS_EXECUTIVE],
        },
        {
          id: "4.3",
          label: t('Clientes.actualizarCliente'),
          Icon: FaEdit,
          path: "/actualizar-cliente",
          roles: [UserRoles.TENANT_ADMIN, UserRoles.COLLECTIONS_EXECUTIVE],
        },
      ],
    },
  ];
};

export default clienteMenu;
