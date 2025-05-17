const DOMAIN_NAME = process.env.NEXT_PUBLIC_DOMAIN_NAME || "";

// SOLO SE PUEDEN ACCEDER DESDE EL DOMINIO AUTH, NO SE NECESITA TOKEN DE ACCESO
const allowedAuthPaths = [
  "/auth/login_company",
  "/auth/slug_not_found",
  "/auth/sign_up_new",
  "/auth/login_company/get_account_url",
  "/auth/login_company/enter_slug",
];

// SE PUEDEN ACCEDER SIN TOKEN DE ACCESO, SOLO PARA TENANT
const publicTenantPaths = [
  "/auth/redirect",
  "/auth/login_company/email_password",
  "/auth/login_company/forgot_password",
  // "/auth/magic_link_login",
  "/auth/change-password",
  "/users/register",
];

// SE DEBEN ACCEDER CON TOKEN DE ACCESO, SOLO PARA TENANT
const privateTenantPaths = [""];

export { DOMAIN_NAME, allowedAuthPaths, publicTenantPaths, privateTenantPaths };
