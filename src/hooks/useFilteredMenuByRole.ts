import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import HomeMenu from "@/modules/menus/Home";
import CuentasPorCobrar from "@/modules/menus/CuentasPorCobrar";
import CobranzaMenu from "@/modules/menus/Cobranzas";
import clienteMenu from "@/modules/menus/Clientes";
import estadoCuentaMenu from "@/modules/menus/EstadoCuenta";
import reporteMenu from "@/modules/menus/Reportes";
import configuracionMenu from "@/modules/menus/Configuracion";
import myAccounts from "@/modules/menus/MyAccounts";
// import seguridadMenu from "@/common/data/menu-rol/Seguridad";
import soporteMenu from "@/modules/menus/Soporte";

interface MenuItem {
  id: string;
  label: string;
  Icon: React.ComponentType;
  path?: string;
  roles?: string[];
  children?: MenuItem[];
}

// Función para filtrar el menú por rol
const filterMenuByRole = (menu: MenuItem[], role: string): MenuItem[] => {
  return menu
    .filter((item) => item.roles?.includes(role)) // Filtra por rol
    .map((item) => {
      if (item.children) {
        return {
          ...item,
          children: item.children.filter((child) =>
            child.roles?.includes(role)
          ), // Filtra los hijos por rol
        };
      }
      return item;
    });
};

// Hook para obtener los menús filtrados según el rol
const useFilteredMenuByRole = (role: string) => {
  console.log("useFilteredMenuByRole");
  const { t } = useTranslation("menu");

  return useMemo(() => {
    const filteredHomeMenu = filterMenuByRole(HomeMenu(t), role); // Pasamos `t` a HomeMenu
    const filteredCuentasPorCobrar = filterMenuByRole(
      CuentasPorCobrar(t),
      role
    );
    const filteredCobranzaMenu = filterMenuByRole(CobranzaMenu(t), role);
    const filteredClienteMenu = filterMenuByRole(clienteMenu(t), role);
    const filteredEstadoCuentaMenu = filterMenuByRole(
      estadoCuentaMenu(t),
      role
    );
    const filteredReporteMenu = filterMenuByRole(reporteMenu(t), role);
    const filteredConfiguracionMenu = filterMenuByRole(
      configuracionMenu(t),
      role
    );
    // const filteredSeguridadMenu = filterMenuByRole(seguridadMenu(t), role);
    const filteredSoporteMenu = filterMenuByRole(soporteMenu(t), role);

    const filteredMyAccounts = filterMenuByRole(myAccounts(t), role);

    // Unimos todos los menús filtrados en un solo array
    return [
      ...filteredHomeMenu,
      ...filteredCuentasPorCobrar,
      ...filteredCobranzaMenu,
      ...filteredClienteMenu,
      // ...filteredEstadoCuentaMenu,
      ...filteredReporteMenu,
      ...filteredConfiguracionMenu,
      // ...filteredSeguridadMenu,
      // ...filteredSoporteMenu,
      ...filteredMyAccounts,
    ];
  }, [role, t]); // Dependemos del 'role' y 't' para re-calcular cuando el rol o el idioma cambien
};

export default useFilteredMenuByRole;
