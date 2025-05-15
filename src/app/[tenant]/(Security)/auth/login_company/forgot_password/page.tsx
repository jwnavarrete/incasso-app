"use client";
import React, { Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ForgotPassword from "./components";
import { AuthProvider } from "@/context";
import LoadingUI from "@/components/ui/LoadingUI";
import LanguageIconButon from "@/components/ui/LanguageIconButon";

export default function page() {
  return (
    <AuthProvider>
      <CssBaseline enableColorScheme />
      <LanguageIconButon />

      <Suspense fallback={<LoadingUI />}>
        <ForgotPassword />
      </Suspense>
    </AuthProvider>
  );
}
