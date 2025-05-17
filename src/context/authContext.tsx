"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
} from "react";
import {
  ICompany,
  initialTenantSignUp,
  ITenantSignUp,
  IUser,
} from "@/common/types/auth/singup";
import AuthService from "@/services/authService";
import {
  iSignIn,
  iTokens,
  iValidateSlugResponse,
} from "@/common/types/auth/auth";
import { ErrorHandler } from "@/lib/errors";

interface AuthContextProps {
  signIn: (data: iSignIn) => Promise<iTokens>;
  step: number;
  signUpData: ITenantSignUp;
  handleNext: () => void;
  handleBack: () => void;
  updateUserSignUpData: (userData: Partial<IUser>) => void;
  updateCompanySignUpData: (companyData: Partial<ICompany>) => void;
  validateSlug: (slug: string) => Promise<iValidateSlugResponse>;
  signUp: () => Promise<iTokens>;
  sendRecoveryUrl: (email: string) => Promise<string>;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
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

  const signIn = async (data: iSignIn): Promise<iTokens> => {
    const authService = new AuthService();
    try {
      setLoading(true);
      const response = await authService.signIn(data);

      if (!response) {
        throw new Error("SignIn failed, response is null");
      }

      return response;
    } catch (error) {
      ErrorHandler.handle(error);
    } finally {
      setLoading(false);
    }
  };

  const sendRecoveryUrl = async (email: string): Promise<string> => {
    const authService = new AuthService();
    try {
      setLoading(true);
      const response = await authService.sendRecoveryUrl(email);

      if (!response) {
        throw new Error("SignIn failed, response is null");
      }

      return response;
    } catch (error) {
      ErrorHandler.handle(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const validateSlug = async (slug: string): Promise<iValidateSlugResponse> => {
    const authService = new AuthService();
    try {
      setLoading(true);

      const response = await authService.validateSlug(slug);
      if (!response) {
        throw new Error("Validate slug failed, response is null");
      }

      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (): Promise<iTokens> => {
    const authService = new AuthService();
    try {
      const response = await authService.createClient(signUpData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const contextValue = useMemo(
    () => ({
      step,
      signUpData,
      loading,
      signIn,
      handleNext,
      handleBack,
      updateUserSignUpData,
      updateCompanySignUpData,
      signUp,
      validateSlug,
      sendRecoveryUrl,
    }),
    [step, signUpData, loading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
