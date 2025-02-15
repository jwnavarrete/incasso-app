"use client";
import React, { Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@/modules/auth/context/authContext";
import LoginCompany from "@/modules/auth/components/login_company";
import LoadingUI from "@/common/components/ui/LoadingUI";
import ColorMode from "@/theme/ColorModeSelector";

export default function page() {
  return (
    <AuthProvider>
      <CssBaseline enableColorScheme />
      <ColorMode />

      <Suspense fallback={<LoadingUI />}>
        <LoginCompany />
      </Suspense>
    </AuthProvider>
  );
}
