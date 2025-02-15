import { showSlug_not_found, isValidSubdomain } from "./functions";

export const SlugMiddleware = async (subdomain: string) => {
  // NO REALIZAR VALIDACIONES DE AUTENTICACION SI ES EL SUBDOMINIO DE AUTENTICACION
  const allowedDomains = process.env.NEXT_PUBLIC_ALLOWED_DOMAINS?.split(',') || [];
  if (allowedDomains.includes(subdomain)) {
    return null;
  }

  const validSlug = await isValidSubdomain(subdomain);

  if (!validSlug) {
    return showSlug_not_found();
  }

  return null; // Si la validación es exitosa, retornar null
};
