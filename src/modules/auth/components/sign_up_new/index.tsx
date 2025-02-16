import React, { useEffect } from "react";
import AccountInfoCard from "./AccountInfoCard";
import CompanyInfoCard from "./CompanyInfoCard";
import { useAuthContext } from "@/modules/auth/context/authContext";
import TermsAndConditionsCard from "./TermsAndConditionsCard";
import LoadingUI from "@/common/components/ui/LoadingUI";

const SignUpNew: React.FC = () => {
  const { step } = useAuthContext();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <LoadingUI />;

  return (
    <>
      {step === 0 && <AccountInfoCard />}
      {step === 1 && <CompanyInfoCard />}
      {step === 2 && <TermsAndConditionsCard />}
    </>
  );
};

export default SignUpNew;
