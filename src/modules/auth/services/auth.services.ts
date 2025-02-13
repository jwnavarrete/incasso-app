import axios from "axios";
import { ITenantSignUp } from "@/modules/auth/interfaces/singup.interface";
import {
  iSignIn,
  iTokens,
  iValidateSlugResponse,
} from "@/modules/auth/interfaces/auth.interface";
import { ErrorHandler } from "@/common/lib/errors";

class AuthService {
  constructor() {}

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
      console.error("Error validating slug:", error);
      throw error;
    }
  }
}

export default AuthService;
