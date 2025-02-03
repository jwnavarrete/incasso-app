import "server-only";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
}

export async function createSession(field: string, token: string) {
  const cookieStore = await cookies();

  const decoded: JwtPayload = jwtDecode(token);
  const expires = new Date(decoded.exp * 1000); // Convertir de segundos a milisegundos

  cookieStore.set(field, token, {
    httpOnly: true,
    secure: true,
    expires,
    sameSite: "lax",
    path: "/",
  });
}