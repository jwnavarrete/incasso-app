"use client";
import React, { Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ColorModeSelect from "@/theme/ColorModeSelect";
import { AuthProvider } from "@/modules/auth/context/authContext";
import LoginCompany from "@/modules/auth/components/login_company";
import LoadingUI from "@/common/components/ui/LoadingUI";

export default function page() {
  return (
    <AuthProvider>
        <CssBaseline enableColorScheme />
        <ColorModeSelect
          sx={{ position: "fixed", top: "1rem", left: "1rem" }}
        />
        <Suspense fallback={<LoadingUI />}>
          <LoginCompany />
        </Suspense>      
    </AuthProvider>
  );
}
