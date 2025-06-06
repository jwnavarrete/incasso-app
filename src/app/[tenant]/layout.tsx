"use client";

import * as React from "react";
import { useRouter } from "next/navigation"; // Para redirigir al usuario
import { useSelector } from "react-redux"; // Para manejar el estado de Redux
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "@/components/layout/AppNavbar";
import Header from "@/components/layout/Header";
import SideMenu from "@/components/layout/SideMenu";
import AppTheme from "@/theme/ThemeProvider";
import { AppState } from "@/store/global.store"; // Acción de logout
import { initializeUser } from "@/store/global.store";
import { ToastContainer } from "react-toastify";
import EmailVerified from "@/components/layout/EmailVerified";

export default function TenantLayout(props: {
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
        <body>
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
        <body>
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
