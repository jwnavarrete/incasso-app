"use client";
import { useRouter } from "next/navigation";
const DOMAIN_NAME = process.env.NEXT_PUBLIC_DOMAIN_NAME || "";

const useClientRouter = () => {
  const router = useRouter();

  const redirectTo = (path: string) => {
    router.push(path);
  };

  const redirectToSlug = (slug: string) => {
    router.push(`https://${slug}.${DOMAIN_NAME}/`);
  };

  const redirectToSlugLoginCompany = (subdomain: string, email?: string) => {
    let baseUrl = `https://${subdomain}.${DOMAIN_NAME}/auth/login_company`;
    // Si se proporciona un correo electrónico, lo agregamos como parámetro de consulta
    if (email) {
      baseUrl += `/email_password?email=${email}`;
    }
    router.push(baseUrl);
  };

  const redirectToLoginCompany = () => {
    router.push(`https://auth.${DOMAIN_NAME}/auth/login_company`);
  };

  const redirectToSignUp = () => {
    router.push(`https://auth.${DOMAIN_NAME}/auth/sign_up_new`);
  };

  return {
    redirectTo,
    redirectToSlug,
    redirectToLoginCompany,
    redirectToSlugLoginCompany,
    redirectToSignUp,
  };
};

export default useClientRouter;
