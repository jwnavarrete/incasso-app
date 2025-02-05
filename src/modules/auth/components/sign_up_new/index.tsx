import React from "react";
import AccountInfoCard from "./AccountInfoCard";
import CompanyInfoCard from "./CompanyInfoCard";
import { useAuthContext } from "@/modules/auth/context/authContext";
import TermsAndConditionsCard from "./TermsAndConditionsCard";

const SignUpNew: React.FC = () => {
  const { step } = useAuthContext();

  return (
    <>
      {step === 0 && <AccountInfoCard />}
      {step === 1 && <CompanyInfoCard />}
      {step === 2 && <TermsAndConditionsCard />}
    </>
  );
};

export default SignUpNew;