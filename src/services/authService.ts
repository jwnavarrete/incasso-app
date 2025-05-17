import axios from "axios";
import { ITenantSignUp } from "@/common/types/auth/singup";
import {
  iSignIn,
  iTokens,
  iValidateSlugResponse,
} from "@/common/types/auth/auth";
import { ErrorHandler } from "@/lib/errors";

class AuthService {
  constructor() { }

  async createClient(clientData: ITenantSignUp): Promise<iTokens> {
    try {
      const response = await axios.post("/api/proxy/auth/signup", clientData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error creating client:", error);
      throw error;
    }
  }

  async signIn(param: iSignIn): Promise<iTokens | null> {
    try {
      const response = await axios.post("/api/proxy/auth/signin", {
        email: param.email,
        password: param.password,
        subdomain: param.subdomain,
      });
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
    }
  }

  async validateSlug(slug: string): Promise<iValidateSlugResponse> {
    try {
      const response = await axios.post("/api/proxy/auth/validate-subdomain", {
        subdomain: slug,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async sendRecoveryUrl(email: string): Promise<string> {
    try {
      const response = await axios.post("/api/proxy/auth/send-recovery-url", {
        email,
      });

      return response.data.message;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
