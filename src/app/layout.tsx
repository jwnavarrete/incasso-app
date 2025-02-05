"use client";

import * as React from "react";
import { useRouter } from "next/navigation"; // Para redirigir al usuario
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "@/common/components/layout/AppNavbar";
import Header from "@/common/components/layout/Header";
import SideMenu from "@/common/components/layout/SideMenu";
import AppTheme from "@/theme/AppTheme";
// import "./globals.css";

// Fuentes
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Simulación de una función para verificar autenticación
const checkAuth = async (): Promise<boolean> => {
  // Aquí puedes usar lógica real para verificar si el usuario está autenticado,
  // como validar cookies, tokens, o llamar a una API.
  const isAuthenticated = document.cookie.includes("authToken=true");
  // return isAuthenticated;
  return false;
};

export default function Dashboard(props: {
  disableCustomTheme?: boolean;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(
    null
  );

  React.useEffect(() => {
    const validateAuth = async () => {
      const auth = await checkAuth();
      setIsAuthenticated(auth);

      // if (!auth) {
      //   router.push("/login"); // Redirige al login si no está autenticado
      // }
    };

    validateAuth();
  }, [router]);

  {
    JSON.stringify(isAuthenticated);
  }
  // Mientras se verifica la autenticación, muestra un loader o un placeholder vacío
  if (
    isAuthenticated === null ||
    isAuthenticated === false ||
    isAuthenticated === undefined
  ) {
    return (
      <html lang="en">
        <body>{props.children}</body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppTheme {...props}>
          <CssBaseline enableColorScheme />
          <Box sx={{ display: "flex" }}>
            {isAuthenticated && <SideMenu />}
            {isAuthenticated && <AppNavbar />}
            {/* Contenido principal */}
            <Box
              component="main"
              sx={(theme) => ({
                flexGrow: 1,
                backgroundColor: alpha(theme.palette.background.default, 1),
                overflow: "auto",
              })}
              className={`${geistSans.variable} ${geistMono.variable}`}
            >
              <Stack
                spacing={2}
                sx={{
                  alignItems: "center",
                  mx: 3,
                  pb: 5,
                  mt: { xs: 8, md: 0 },
                }}
              >
                {isAuthenticated && <Header />}
                {props.children}
              </Stack>
            </Box>
          </Box>
        </AppTheme>
      </body>
    </html>
  );
}
