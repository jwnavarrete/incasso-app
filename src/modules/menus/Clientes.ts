import { UserRoles } from "@/common/enums/userRoles";
import { FaUsers, FaListAlt, FaHistory, FaEdit, FaWallet } from "react-icons/fa";

const clienteMenu = (t: (key: string) => string) => {
  return [
    {
      id: "4",
      label: t('Clientes.title'),
      Icon: FaUsers,
      roles: [UserRoles.COLLECTIONS_EXECUTIVE],
      children: [
        {
          id: "4.1",
          label: t('Clientes.listadoClientes'),
          Icon: FaListAlt,
          path: "/customers",
          roles: [UserRoles.COLLECTIONS_EXECUTIVE],
        },
        {
          id: "4.2",
          label: t('Clientes.historialFacturacion'),
          Icon: FaHistory,
          path: "/billing-history",
          roles: [UserRoles.COLLECTIONS_EXECUTIVE],
        },
        {
          id: "4.3",
          label: t('Clientes.actualizarCliente'),
          Icon: FaEdit,
          path: "/update-customer",
          roles: [UserRoles.COLLECTIONS_EXECUTIVE],
        },
        {
          id: "4.4",
          label: 'Estado de Cuentas por Cliente',
          Icon: FaWallet,
          path: "/customer-account-status",
          roles: [UserRoles.COLLECTIONS_EXECUTIVE],
        },
      ],
    },
  ];
};

export default clienteMenu;
