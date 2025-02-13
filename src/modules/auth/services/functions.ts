import {
  decodeToken,
  getClientSessionByCode,
  updatePublicSession,
} from "@/common/lib/session";

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
