import RegisterComponent from "@/app/[tenant]/(Security)/users/register/components";
import { UserProvider } from "@/context";
import React from "react";

const RegisterPage: React.FC = () => {
  return (
    <UserProvider>
      <RegisterComponent />
    </UserProvider>
  );
};

export default RegisterPage;
