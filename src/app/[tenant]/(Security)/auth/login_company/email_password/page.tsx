"use client";
import React, { Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@/context";
import EmailAndPassword from "./components";
import LoadingUI from "@/components/ui/LoadingUI";
import useAuthenticate from "@/hooks/useAuthenticate";
import LanguageIconButon from "@/components/ui/LanguageIconButon";

export default function page() {
  const isAuthenticated = useAuthenticate();

  if (isAuthenticated) {
    return <LoadingUI />;
  }

  return (
    <AuthProvider>
      <CssBaseline enableColorScheme />
      <LanguageIconButon />

      <Suspense fallback={<LoadingUI />}>
        <EmailAndPassword />
      </Suspense>
    </AuthProvider>
  );
}
