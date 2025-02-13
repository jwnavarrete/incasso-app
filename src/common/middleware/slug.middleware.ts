import { showSlug_not_found, isValidSubdomain } from "./functions";

export const SlugMiddleware = async (subdomain: string) => {
  const validSlug = await isValidSubdomain(subdomain);

  if (!validSlug) {
    return showSlug_not_found();
  }

  return null; // Si la validación es exitosa, retornar null
};
