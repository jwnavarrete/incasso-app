const DOMAIN_NAME = process.env.NEXT_PUBLIC_DOMAIN_NAME || "";

const allowedDomains = [
  "incasso-app.vercel.app",
  "incasso-app",
  "incasso-app.vercel",
];

const allowedLandingPath = ["/"];

const allowedAuthPaths = [
  "/auth/login_company",
  "/auth/slug_not_found",
  "/auth/sign_up_new",
  "/auth/login_company/get_account_url",
  "/auth/login_company/enter_slug",
];

const allowTenantPaths = [
  "/auth/redirect",
  // "/auth/magic_link_login",
  "/auth/login_company/email_password",
];

// const publicTenantPaths = [
//   "/auth/redirect",
//   "/auth/login_company/email_password",
// ];

export {
  DOMAIN_NAME,
  allowedDomains,
  allowedAuthPaths,
  allowTenantPaths,
  allowedLandingPath,
};
