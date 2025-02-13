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
    redirectToSignUp,
  };
};

export default useClientRouter;
