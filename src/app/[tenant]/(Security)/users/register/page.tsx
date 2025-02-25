import RegisterComponent from "@/modules/users/components/register";
import { UserProvider } from "@/modules/users/context/userContext";
import React from "react";

const RegisterPage: React.FC = () => {
  return (
    <UserProvider>
      <RegisterComponent />
    </UserProvider>
  );
};

export default RegisterPage;
