"use client";
import React, { Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ColorModeSelect from "@/theme/ColorModeSelect";
import { AuthProvider } from "@/modules/auth/context/authContext";
import EmailAndPassword from "@/modules/auth/components/email_password";
import LoadingUI from "@/common/components/ui/LoadingUI";
import useAuthenticate from "@/common/hooks/useAuthenticate";

export default function page() {
  const isAuthenticated = useAuthenticate();

  if (isAuthenticated) {
    return <LoadingUI />;
  }

  return (
    <AuthProvider>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", left: "1rem" }} />
      <Suspense fallback={<LoadingUI />}>
        <EmailAndPassword />
      </Suspense>
    </AuthProvider>
  );
}
