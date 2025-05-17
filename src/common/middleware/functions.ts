import { NextResponse } from "next/server";
import { DOMAIN_NAME } from "./constantes";
import axios from "axios";

const setActiveSlugLogin = (subdomain: string) => {
  const response = NextResponse.redirect(
    new URL(`https://${subdomain}.${DOMAIN_NAME}/`)
  );
  response.cookies.set("active_account_slugs", subdomain, {
    path: "/",
    domain: `${subdomain}.${DOMAIN_NAME}`,
  });
  return response;
};

const showNext = () => {
  return NextResponse.next();
};

const showLoginCompany = () => {
  return NextResponse.redirect(
    new URL(`https://auth.${DOMAIN_NAME}/auth/login_company`)
  );
};

const showSlugLogin = (active_account_slugs: string, subdomain: string) => {
  let subdomainRedirect = subdomain;

  if (active_account_slugs) {
    subdomainRedirect = active_account_slugs;
  }
  const response = NextResponse.redirect(
    new URL(
      `https://${subdomainRedirect}.${DOMAIN_NAME}/auth/login_company/email_password`
    )
  );

  response.cookies.set("active_account_slugs", subdomainRedirect, {
    path: "/",
    domain: `${subdomainRedirect}.${DOMAIN_NAME}`,
  });
  return response;
};

const showSlug_not_found = () => {
  return NextResponse.redirect(
    new URL(`https://auth.${DOMAIN_NAME}/auth/slug_not_found`)
  );
};

const showSlugDashboard = (active_account_slugs: string, subdomain: string) => {
  let subdomainRedirect = subdomain;

  if (active_account_slugs) {
    subdomainRedirect = active_account_slugs;
  }
  const response = NextResponse.redirect(
    new URL(`https://${subdomainRedirect}.${DOMAIN_NAME}`)
  );

  response.cookies.set("active_account_slugs", subdomainRedirect, {
    path: "/",
    domain: `${subdomainRedirect}.${DOMAIN_NAME}`,
  });

  return response;
};

const showLandigPage = () => {
  return NextResponse.redirect(new URL(`https://${DOMAIN_NAME}`));
};

const showResetPassword = (reset_password_token: string, subdomain: string) => {
  return NextResponse.redirect(
    new URL(
      `https://${subdomain}.${DOMAIN_NAME}/users/password/edit?reset_password_token=${reset_password_token}`
    )
  );
};

const showErrorPage = () => {
  return NextResponse.redirect(
    new URL(`https://${DOMAIN_NAME}`)
  );
};

const isValidSubdomain = async (subdomain: string): Promise<boolean> => {
  try {
    // SI ES EL SUBDOMINIO DE AUTENTICACIÓN RETORNAMOS TRUE
    if (subdomain === "auth") return true;
    // SI ES EL SUBDOMINIO DE LA PÁGINA PRINCIPAL RETORNAMOS TRUEÍ
    const allowedDomains =
      process.env.PROD_NEXT_PUBLIC_ALLOWED_DOMAINS?.split(",") || [];
    if (allowedDomains.includes(subdomain)) return true;

    // Lógica para validar subdominio
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/validate-subdomain`,
      {
        subdomain,
      }
    );

    return response.data.isValid;
  } catch (error) {
    return false;
  }
};

export {
  setActiveSlugLogin,
  showLoginCompany,
  showSlugLogin,
  showSlug_not_found,
  showSlugDashboard,
  showLandigPage,
  isValidSubdomain,
  showNext,
  showResetPassword,
  showErrorPage,
};
