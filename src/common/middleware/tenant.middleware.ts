import { NextRequest } from "next/server";
import { showNext, showSlugLogin, showLoginCompany } from "./functions";
import {
  allowedAuthPaths,
  allowedDomains,
  allowedLandingPath,
  allowTenantPaths,
} from "./constantes";
import { isAccessTokenValid } from "../lib/session";

export const TenantMiddleware = async (subdomain: string, req: NextRequest) => {
  // NO REALIZAR VALIDACIONES DE AUTENTICACION SI ES EL SUBDOMINIO DE AUTENTICACION
  if (subdomain === "auth") {
    return null;
  }

  const cookies = req.cookies;
  const url = new URL(req.url);
  const path = url.pathname;
  // OBTENEMOS LAS SESSIONES NECESARIAS
  const refreshToken = cookies.get("refreshToken")?.value;
  const active_account_slugs = cookies.get("active_account_slugs")?.value || "";
  const last_login_session = cookies.get("last_login_session")?.value || "";
  // VALIDACIONES
  const isPrincipalDomain = allowedDomains.includes(subdomain);
  const isAllowdAuthPath = allowedAuthPaths.includes(path);
  const isAllowTenantPaths = allowTenantPaths.includes(path);
  const isAllowLandinPath = allowedLandingPath.includes(path);

  // LOS DOMINIOS PRINCIPALES NO TIENES TOKEN DE ACCESO
  if (isPrincipalDomain) {
    // SI ESTA INTENTANDO ACCEDER A UNA RUTA DE AUTH REDIRIGE A LA PAGINA DE LOGIN
    if (isAllowdAuthPath) {
      // REDIRIGE A LA ULTIMA SESION DE LOGIN EN CASO DE QUE EXISTA,
      // CASO CONTRARIO REDIRIGE A LA PAGINA DE LOGIN
      if (last_login_session) {
        return showSlugLogin(last_login_session, subdomain);
      } else {
        return showLoginCompany();
      }
    } else {
      // SI NO ES UNA RUTA PERMITA EN EL LANDIN PAGE REDIRIGE A LA PAGINA DE LOGIN
      if (!isAllowLandinPath) {
        return showLoginCompany();
      }
    }
    // SI ES UNA RUTA DE TENANT PERMITIDA
    return showNext();
  }

  // SI NO HAY TOKEN DE REFRESCO
  if (!refreshToken) {
    // SI NO ES UNA RUTA PERMITIDA REDIRIGE A LA PAGINA DE LOGIN
    if (!isAllowTenantPaths) {
      return showSlugLogin(active_account_slugs, subdomain);
    }
  }

  if (refreshToken) {
    // VALIDAMOS QUE EL TOKEN DE ACCESO SEA VALIDO
    if (!isAccessTokenValid(refreshToken)) {
      // REDIRIGE A LA ULTIMA SESION DE LOGIN EN CASO DE QUE EXISTA,
      // CASO CONTRARIO REDIRIGE A LA PAGINA DE LOGIN
      if (last_login_session) {
        return showSlugLogin(last_login_session, subdomain);
      } else {
        return showLoginCompany();
      }
    }
    // SI LA SESSION ES VALIDA YA NO PUEDE ACCEDER A LAS RUTAS DE AUTENTICACION DEL TENANT
    if (isAllowTenantPaths) {
      return showLoginCompany();
    }
  }

  return null; // Si la validación es exitosa, retornar null
};
