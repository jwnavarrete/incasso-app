import axios from "axios";
// import Cookies from "js-cookie"; // Para manejar cookies en el navegador
import Router from "next/router"; // Para redirigir al usuario
import { getClientSessionByCode, setClientSession } from "./session";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constant";

const BACKEND_API_URL = "/api/proxy/"; // URL base de tu API
const DOMAIN_NAME = process.env.NEXT_PUBLIC_DOMAIN_NAME;

// Configuración básica del Axios
const api = axios.create({
  baseURL: BACKEND_API_URL, // Cambia esto por tu URL base
  timeout: 10000, // Timeout de 10 segundos
});

// Función para obtener el token de autenticación
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    const accessToken = getClientSessionByCode(ACCESS_TOKEN);
    return accessToken;
  }
  return null;
};

// Interceptor para agregar el token en cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Agregar token a las cabeceras
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y renovar el token
api.interceptors.response.use(
  (response) => {
    return response; // Si la respuesta es exitosa, simplemente la devolvemos
  },
  async (error) => {
    const originalRequest = error.config;
    const router = Router;

    // Si el error es 401 (No autorizado) y el refresh token no ha sido usado
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const _refreshToken = getClientSessionByCode(REFRESH_TOKEN);

      if (!_refreshToken) {
        // router.push("/login"); // Redirigir a la página de login si no tenemos refresh token
        router.push(`https://auth.${DOMAIN_NAME}/auth/login_company`); // Si la renovación falla, redirigimos a login
        return Promise.reject(error);
      }

      try {
        // Realizamos la solicitud para renovar el token
        const response = await axios.post(
          `${BACKEND_API_URL}/auth/refresh-token`,
          { refreshToken: _refreshToken }
        );

        const { accessToken, refreshToken } = response.data;
        
        setClientSession(accessToken, refreshToken);

        // Actualizamos el header con el nuevo access token
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        // Reintentamos la solicitud original con el nuevo token
        return axios(originalRequest);
      } catch (err) {
        router.push(`https://auth.${DOMAIN_NAME}/auth/login_company`); // Si la renovación falla, redirigimos a login
        return Promise.reject(err);
      }
    }

    // Si no es un error 401 o el refresh token no puede ser usado, rechazamos el error
    return Promise.reject(error);
  }
);

export default api;
