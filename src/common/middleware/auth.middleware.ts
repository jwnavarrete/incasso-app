import { NextRequest } from "next/server";
import { allowedAuthPaths } from "./constantes";
import { showSlugLogin } from "./functions";

export const AuthMiddleware = async (subdomain: string, req: NextRequest) => {
  // NO REALIZAR VALIDACIONES DE AUTENTICACION SI NO ES EL SUBDOMINIO DE AUTENTICACION
  if (subdomain !== "auth") {
    return null;
  }
  // DECLARACION DE VARIABLES
  const cookies = req.cookies;
  const url = new URL(req.url);
  const path = url.pathname;
  const isAllowdAuthPath = allowedAuthPaths.includes(path);
  const last_login_session = cookies.get("last_login_session")?.value || "";

  // SI NO ES UNA RUTA PERMITIDA Y NO HAY UNA SESION DE LOGIN, REDIRIGE A LA PAGINA DE LOGIN
  if (!isAllowdAuthPath) {
    return showSlugLogin(last_login_session, subdomain);
  }

  return null; // Si la validación es exitosa, retornar null
};
