import React from "react";
import AccountInfoCard from "./AccountInfoCard";
import CompanyInfoCard from "./CompanyInfoCard";
import { useAuthContext } from "@/modules/auth/context/authContext";
import OnboardingLayout from "@/common/components/layout/OnboardingLayout";

const SignUpNew: React.FC = () => {
  const { step } = useAuthContext();

  const urlImage =
    step === 0
      ? "https://dapulse-res.cloudinary.com/image/upload/monday_platform/signup/signup-right-side-assets-new-flow/welcome-to-monday.png"
      : "https://thumbs.dreamstime.com/b/hand-hold-phone-online-book-hotel-booking-ticket-flight-smartphone-application-icon-business-marketing-service-242015825.jpg";

  return (
    <OnboardingLayout backgroundImageUrl={urlImage}>
      {step === 0 && <AccountInfoCard />}
      {step === 1 && <CompanyInfoCard />}
    </OnboardingLayout>
  );
};

export default SignUpNew;
