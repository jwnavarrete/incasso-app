"use client";
import React, { Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@/modules/auth/context/authContext";
import EmailAndPassword from "@/modules/auth/components/email_password";
import LoadingUI from "@/common/components/ui/LoadingUI";
import useAuthenticate from "@/common/hooks/useAuthenticate";
import IconButtons from "@/common/components/auth/IconButtons";

export default function page() {
  const isAuthenticated = useAuthenticate();

  if (isAuthenticated) {
    return <LoadingUI />;
  }

  return (
    <AuthProvider>
      <CssBaseline enableColorScheme />
      <IconButtons />

      <Suspense fallback={<LoadingUI />}>
        <EmailAndPassword />
      </Suspense>
    </AuthProvider>
  );
}
