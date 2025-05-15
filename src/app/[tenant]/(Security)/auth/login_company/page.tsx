"use client";
import React, { Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@/context";
import LoginCompany from "./components";
import LoadingUI from "@/components/ui/LoadingUI";
import LanguageIconButon from "@/components/ui/LanguageIconButon";

export default function page() {
  return (
    <AuthProvider>
      <CssBaseline enableColorScheme />
      <LanguageIconButon />

      <Suspense fallback={<LoadingUI />}>
        <LoginCompany />
      </Suspense>
    </AuthProvider>
  );
}
