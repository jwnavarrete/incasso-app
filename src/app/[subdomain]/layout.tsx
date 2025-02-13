"use client";

import * as React from "react";
import { useRouter } from "next/navigation"; // Para redirigir al usuario
import { useSelector } from "react-redux"; // Para manejar el estado de Redux
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "@/common/components/layout/AppNavbar";
import Header from "@/common/components/layout/Header";
import SideMenu from "@/common/components/layout/SideMenu";
import AppTheme from "@/theme/AppTheme";
import { AppState } from "@/common/store/global.store"; // Acción de logout
import { initializeUser } from "@/common/store/global.store";
import { ToastContainer } from "react-toastify";
import { Geist, Geist_Mono } from "next/font/google";
import EmailVerified from "@/common/components/layout/EmailVerified";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Dashboard(props: {
  disableCustomTheme?: boolean;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isAuthenticated =
    useSelector((state: AppState) => state.isAuthenticated) ?? null;

  React.useEffect(() => {
    // Inicializamos el usuario cuando se carga el layout
    initializeUser();
  }, [isAuthenticated, router]);

  // Si no está autenticado, redirige al login
  if (!isAuthenticated) {
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <AppTheme {...props}>
            {props.children}
            <ToastContainer />
          </AppTheme>
        </body>
      </html>
    );
  }

  if (isAuthenticated) {
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <AppTheme {...props}>
            <CssBaseline enableColorScheme />

            <Box
              sx={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
              <EmailVerified />
              <Box sx={{ display: "flex" }}>
                <SideMenu />
                <Box sx={{ display: "flex" }}>
                  <AppNavbar />
                </Box>

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
                    <Header />

                    {props.children}
                  </Stack>
                </Box>
              </Box>
            </Box>

            <ToastContainer />
          </AppTheme>
        </body>
      </html>
    );
  }
}
