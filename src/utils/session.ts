import { NextApiResponse } from "next";
import Cookies from "js-cookie"; // Para cookies en el cliente
import { setCookie, destroyCookie } from "nookies"; // Para cookies en el servidor
import { AuthCookieNames } from "@/common/enums/authCookieNames";
import { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { iTokens, iIdToken } from "@/common/types/auth/auth";
import { localStorageHelper } from "@/utils/localStorage";
import store, { logout, setUser } from "@/store/global.store";

const DOMAIN_NAME = process.env.NEXT_PUBLIC_DOMAIN_NAME || "";

interface IDecodedToken {
  exp: number;
  email: string;
  role: string;
  tenantId: string;
  subdomain: string;
  type: string;
  sub: string;
}

// Lógica para gestionar cookies httpOnly en el servidor
export const setSessionCookies = (
  res: NextApiResponse,
  accessToken: string,
  refreshToken: string
) => {
  setCookie({ res }, AuthCookieNames.ACCESS_TOKEN, accessToken, {
    maxAge: 60 * 60 * 24, // 1 día
    path: "/",
  });

  setCookie({ res }, AuthCookieNames.REFRESH_TOKEN, refreshToken, {
    maxAge: 60 * 60 * 24 * 30, // 30 días
    path: "/",
    httpOnly: false, // Protege la cookie de acceso desde JavaScript
    secure: process.env.NODE_ENV === "production", // Solo para HTTPS en producción
  });
};

export const decodeToken = (accessToken: string): IDecodedToken | null => {
  try {
    const decodedToken = jwtDecode<IDecodedToken>(accessToken);
    return decodedToken;
  } catch (error) {
    console.error("Invalid access token", error);
    return null;
  }
};

export const decodeIdToken = (idToken: string): iIdToken | null => {
  try {
    const decodedToken = jwtDecode<iIdToken>(idToken);
    return decodedToken;
  } catch (error) {
    console.error("Invalid ID token", error);
    return null;
  }
};

export const isAccessTokenValid = (accessToken: string): boolean => {
  try {
    if (!accessToken) {
      return false;
    }

    const decodedToken = decodeToken(accessToken);
    if (!decodedToken) {
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp > currentTime;
  } catch (error) {
    console.error("Invalid access token", error);
    return false;
  }
};

// Eliminar cookies (en caso de logout)
export const clearSessionCookies = (res: NextRequest) => {
  destroyCookie({ res }, AuthCookieNames.ACCESS_TOKEN, { path: "/" });
  destroyCookie({ res }, AuthCookieNames.REFRESH_TOKEN, { path: "/" });
};

export const updatePublicSession = (type: string, session: string) => {
  removeSession(type);
  setPublicSession(type, session);
};

export const setProxiAuthSession = (tokens: iTokens) => {
  const expirationDate = new Date();
  expirationDate.setMinutes(expirationDate.getMinutes() + 5); // 5 minutos desde ahora

  const session = JSON.stringify(tokens);

  Cookies.set(AuthCookieNames.ACCESS_TOKEN, session, {
    expires: expirationDate, // Duración definida por expirationDate (5 minutos)
    path: "/",
    secure: process.env.NODE_ENV === "production",
    domain: `.${DOMAIN_NAME}`,
  });
};

export const setPublicSession = (type: string, session: string) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 180); // 180 días desde hoy
  //
  Cookies.set(type, session, {
    expires: expirationDate, // 1 día de duración
    path: "/",
    secure: process.env.NODE_ENV === "production",
    // httpOnly: false,
    domain: `.${DOMAIN_NAME}`, // Subdominio de incassoapp.test
    // sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  });
};

// Lógica para manejar cookies en el cliente
export const setClientSession = (accessToken: string, refreshToken: string) => {
  const decodedToken = decodeToken(accessToken);
  const AccessExpirationDate = new Date();
  const RefreshExpirationDate = new Date();
  AccessExpirationDate.setMinutes(AccessExpirationDate.getMinutes() + 5); // 5 minutos desde ahora
  RefreshExpirationDate.setDate(RefreshExpirationDate.getDate() + 180); // 180 días desde hoy

  Cookies.set(AuthCookieNames.ACCESS_TOKEN, accessToken, {
    expires: AccessExpirationDate, // 5 minutos de duración
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: false,
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  });

  Cookies.set(AuthCookieNames.REFRESH_TOKEN, refreshToken, {
    expires: RefreshExpirationDate, // 180 days
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: false,
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  });
};

// Obtener sesión en el cliente
export const getClientSession = () => {
  const accessToken = localStorage.getItem(AuthCookieNames.ACCESS_TOKEN);
  const refreshToken = Cookies.get(AuthCookieNames.REFRESH_TOKEN);

  return { accessToken, refreshToken };
};

export const getClientSessionByCode = (session: string) => {
  const sessionValue = Cookies.get(session);
  if (!sessionValue) {
    return null;
  }
  return sessionValue;
};

export const removeSession = (session: string) => {
  Cookies.remove(session, { path: "/", domain: `.${DOMAIN_NAME}` });
};

// Limpiar sesión en el cliente
export const clearClientSession = () => {
  Cookies.remove(AuthCookieNames.ACCESS_TOKEN, { path: "/" });
  Cookies.remove(AuthCookieNames.REFRESH_TOKEN, { path: "/" });
  Cookies.remove(AuthCookieNames.AUTH_TOKEN, { path: "/" });
  // Eliminar información del usuario del store
  localStorageHelper.removeItem("userInfo");
  store.dispatch(logout());
};

export const setAuthSession = (tokens: iTokens) => {
  const idToken = decodeIdToken(tokens.idToken);

  localStorageHelper.removeItem("userInfo");
  localStorageHelper.setItem("userInfo", JSON.stringify(idToken));

  // Set user information in the store
  store.dispatch(setUser(idToken));
  setClientSession(tokens.accessToken, tokens.refreshToken);
  // ACTUALIZAMOS EL SLUG DEL CLIENTE
  updateAccountSlugs(tokens.accessToken);
};



export const updateAccountSlugs = (accessToken: string) => {
  const dedodedToken = decodeToken(accessToken);
  const subdomain = dedodedToken?.subdomain || "";
  // ACTUALIZAMOS LOS SLUGS DE CUENTAS
  const existingSlugs = getClientSessionByCode("dapulseAccountSlugs");
  // SI EXISTEN SLUGS, LOS ACTUALIZAMOS
  const existingSlugsParsed = JSON.parse(existingSlugs || "[]");

  const existingSlugsFiltered = existingSlugsParsed.filter(
    (slug: string) => slug !== subdomain
  );
  const updatedSlugs = [...existingSlugsFiltered, subdomain];

  updatePublicSession("dapulseAccountSlugs", JSON.stringify(updatedSlugs));
  // ACTUALIZAMOS EL ULTIMO SLUG UTILIZADO
  updatePublicSession("last_login_session", subdomain);
};
