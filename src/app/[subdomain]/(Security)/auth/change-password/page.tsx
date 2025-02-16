"use client";
import React, { Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@/modules/auth/context/authContext";
import LoadingUI from "@/common/components/ui/LoadingUI";
import ColorMode from "@/theme/ColorModeSelector";
import ChangePassword from "@/modules/auth/components/change_password";

export default function page() {
  return (
    <AuthProvider>
      <CssBaseline enableColorScheme />  
      <ColorMode />

      <Suspense fallback={<LoadingUI />}>
        <ChangePassword />
      </Suspense>
    </AuthProvider>
  );
}
