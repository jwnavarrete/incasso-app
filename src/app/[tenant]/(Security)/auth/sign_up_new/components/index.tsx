import React, { useEffect } from "react";
import AccountInfoCard from "./AccountInfoCard";
import CompanyInfoCard from "./CompanyInfoCard";
import { useAuthContext } from "@/context";
import TermsAndConditionsCard from "./TermsAndConditionsCard";
import LoadingUI from "@/components/ui/LoadingUI";
import useClientRouter from "@/hooks/useNavigations";



const SignUpNew: React.FC = () => {
  const { redirectToSignUp, redirectTo } = useClientRouter();

  const { step, validateToken } = useAuthContext();
  const [client, setClient] = React.useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      if (token) {
        const isValid = await validateToken(token);
        if (!isValid) {
          redirectTo("/");
        }
      }
    };
    setClient(true);
    checkToken();
  }, []);



  if (!client) return <LoadingUI />;

  return (
    <>
      {step === 0 && <AccountInfoCard />}
      {step === 1 && <CompanyInfoCard />}
      {step === 2 && <TermsAndConditionsCard />}
    </>
  );
};

export default SignUpNew;
