import React, { createContext, useContext, ReactNode, useState } from "react";
import {
  ICompany,
  initialTenantSignUp,
  ITenantSignUp,
  IUser,
} from "@/modules/auth/interfaces/singUp";

interface AuthContextProps {
  login: (data: IUser) => void;
  logout: () => void;
  step: number;
  signUpData: ITenantSignUp;
  handleNext: () => void;
  handleBack: () => void;
  updateUserSignUpData: (userData: Partial<IUser>) => void;
  updateCompanySignUpData: (companyData: Partial<ICompany>) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [step, setStep] = useState(0);
  const [signUpData, setSignUpData] =
    useState<ITenantSignUp>(initialTenantSignUp);

  const updateUserSignUpData = (userData: Partial<IUser>) => {
    setSignUpData((prevData) => ({
      ...prevData,
      user: {
        ...prevData.user,
        ...userData,
      },
    }));
  };

  const updateCompanySignUpData = (companyData: Partial<ICompany>) => {
    setSignUpData((prevData) => ({
      ...prevData,
      company: {
        ...prevData.company,
        ...companyData,
      },
    }));
  };

  const login = (data: IUser) => {
    // Implement login logic here
    console.log("Login data:", data);
  };

  const logout = () => {
    // Implement logout logic here
    console.log("Logged out");
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        step,
        signUpData,
        handleNext,
        handleBack,
        updateUserSignUpData,
        updateCompanySignUpData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
