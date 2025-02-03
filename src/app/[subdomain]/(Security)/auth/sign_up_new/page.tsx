"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "@/theme/AppTheme";
import ColorModeSelect from "@/theme/ColorModeSelect";
import { AuthProvider } from "@/modules/auth/context/authContext";
import SignUpNew from "@/modules/auth/components/sign_up_new";

export default function page(props: { disableCustomTheme?: boolean }) {
  return (
    <AuthProvider>
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        {/* <ColorModeSelect
          sx={{ position: "fixed", top: "1rem", right: "1rem" }}
        /> */}

        <SignUpNew />
      </AppTheme>
    </AuthProvider>
  );
}
