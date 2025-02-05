import axios from "axios";
import { ITenantSignUp } from "../interfaces/singUp";

class AuthService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || ""; // Reemplaza con la URL de tu API
    }

    async createClient(clientData: ITenantSignUp): Promise<any> {
        try {
            const response = await axios.post(
                `${this.baseUrl}/clients/register`,
                clientData
            );
            return response.data;
        } catch (error) {
            console.error("Error creating client:", error);
            throw error;
        }
    }
}

export default AuthService;
